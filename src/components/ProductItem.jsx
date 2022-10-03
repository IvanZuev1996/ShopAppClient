import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../redux/cartRedux';
import '../styles/Products.css';

const linkStyle = {
  color: 'black',
};

const ProductItem = ({ item }) => {
  const cartProducts = useSelector((state) => state.cart.products);
  const [isHaveInCart, setIsHaveInCart] = useState(false);

  useEffect(() => {
    cartProducts.forEach((element) => {
      element._id === item._id && setIsHaveInCart(true);
    });
  }, [cartProducts, item]);

  return (
    <div className="product-item-container">
      <img src={item.img} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{item.title}</h2>
        <div className="products-icons">
          <div className="cart-icon">
            <Link
              to={isHaveInCart ? `/cart` : `/product/${item._id}`}
              style={linkStyle}
            >
              <ShoppingCartOutlined
                style={{ color: isHaveInCart ? 'blue' : 'black' }}
              />
            </Link>
          </div>
          <div className="cart-icon">
            <Link to={`/product/${item._id}`} style={linkStyle}>
              <SearchOutlined />
            </Link>
          </div>
          <div className="cart-icon">
            <FavoriteBorderOutlined />
          </div>
        </div>
        <h2 className="product-price">{`${item.price} ₽`}</h2>
      </div>
    </div>
  );
};

export default ProductItem;
