import React from 'react';
import { Add, Remove, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CartItem = ({ product, changeQuantity, handleClick }) => {
  return (
    <div className="cart-product-wrapper" key={product.productId}>
      <div className="cart-product-info-details">
        <img src={product.img} className="cart-product-img" />
        <div className="cart-product-info-title">
          <div className="cart-product-id">
            <Link
              to={`/product/${product._id}`}
              style={{
                textDecoration: 'none',
              }}
            >
              <b>ID</b>: {product._id.slice(0, 7)}
            </Link>
          </div>
          <div className="cart-product-title">
            <b>Product</b>: {product.title}
          </div>
          <div className="cart-product-desc product-desc">{product.desc}</div>
          <div className="cart-product-color">
            <div className="cart-product-color-title">
              <b>Size</b>:{' '}
            </div>
            <p className="product-size">{product.size}</p>
          </div>
        </div>
      </div>
      <div className="product-remove-details">
        <div className="cart-product-price-details">
          <div className="cart-product-amount-container">
            <Remove
              onClick={() => changeQuantity(product, 'remove')}
              className="change-quantity"
            />
            <div className="cart-product-amount">{product.quantity}</div>
            <Add
              onClick={() => changeQuantity(product, 'add')}
              className="change-quantity"
            />
          </div>
          <div className="cart-product-price-wrapper">
            {product.price * product.quantity}₽
          </div>
        </div>
        <div className="remove-product-wrapper">
          <Close
            className="remove-product"
            onClick={() => handleClick(product)}
          ></Close>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
