import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () =>
    cart
      .reduce((sum, it) => {
        const unit = parseFloat(String(it.cost).replace("$", "")); 
        return sum + unit * it.quantity;
      }, 0)
      .toFixed(2);

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping?.(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const unit = parseFloat(String(item.cost).replace("$", ""));
    return (unit * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 && (
        <p style={{ color: "#444" }}>Your cart is empty. Add some plants 🌿</p>
      )}

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image || item.thumbnail}
              alt={item.name}
            />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease ${item.name}`}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">{item.quantity}</span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                  aria-label={`Increase ${item.name}`}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }} className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continuar comprando
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert("Functionality to be added for future reference")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
