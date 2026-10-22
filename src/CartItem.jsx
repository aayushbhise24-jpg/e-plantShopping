
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Convert the plant price to a number, whether it is 15 or "$15".
  const getPrice = (item) =>
    Number(String(item.cost).replace(/[^0-9.]/g, '')) || 0;

  // Calculate the total price of all items.
  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + getPrice(item) * item.quantity,
      0
    ).toFixed(2);
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Calculate the subtotal for one plant.
  const calculateTotalCost = (item) => {
    return (getPrice(item) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty. Let's add some plants!</p>
          <button
            className="get-started-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>

                  <div className="cart-item-cost">
                    Unit price: ${getPrice(item).toFixed(2)}
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button cart-item-button-dec"
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <span className="cart-item-quantity-value">
                      {item.quantity}
                    </span>

                    <button
                      className="cart-item-button cart-item-button-inc"
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    Subtotal: ${calculateTotalCost(item)}
                  </div>

                  <button
                    className="cart-item-delete"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="total_cart_amount">
            <h2>Total: ${calculateTotalAmount()}</h2>
          </div>

          <div className="continue_shopping_btn">
            <button
              className="get-started-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>

            <button
              className="get-started-button1"
              onClick={() => window.alert('Checkout coming soon!')}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
