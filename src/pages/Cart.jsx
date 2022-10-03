import React, { useEffect } from 'react';
import Announcement from '../components/UI/Announcement/Announcement';
import Navbar from '../components/Static/Navbar';
import Footer from '../components/Static/Footer';
import '../styles/Cart.css';
import { West } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react';
import { userRequest } from '../requestMethods';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct, removeProduct, updateProduct } from '../redux/cartRedux';
import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import CartItem from '../components/CartItem';

const KEY = process.env.REACT_APP_STRIPE;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;
const SummaruItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const BackButton = {
  cursor: 'pointer',
  marginLeft: '10px',
};

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const [removedProduct, setRemovedProduct] = useState('');
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  const changeQuantity = (product, type) => {
    if (type === 'add') {
      dispatch(updateProduct({ ...product, quantity: product.quantity + 1 }));
    } else if (type === 'remove') {
      if (product.quantity > 1) {
        dispatch(updateProduct({ ...product, quantity: product.quantity - 1 }));
      }
    }
  };

  const handleClick = (product) => {
    dispatch(removeProduct(product));
    setRemovedProduct(product.productId);
  };

  useEffect(() => {
    const updateCart = async () => {
      user &&
        (await userRequest(user.accessToken).put(`/carts/${user._id}`, cart));
    };
    updateCart();
  }, [cart]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest(user.accessToken).post(
          '/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          }
        );
        navigate('/success', { state: res.data });
      } catch (err) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <div className="cart-container">
      <Navbar />
      <Announcement />
      <div className="cart-wrapper">
        <h1 className="main-cart-title">YOUR BAG</h1>
        <div className="top-cart">
          <West style={BackButton} onClick={() => navigate(-1)}>
            GO BACK
          </West>
          <div className="cart-desc">
            <p className="cart-desc-title">{`Shopping Bag(${cart.quantity})`}</p>
            <p className="cart-desc-title">Your WishList(0)</p>
          </div>
          <a href="#" className="cart-btn-checkout">
            CHECKOUT NOW
          </a>
        </div>
        <div className="bottom-cart">
          <div className="cart-info">
            <TransitionGroup>
              {cart.products.map((product) => (
                <CSSTransition
                  key={product.productId}
                  timeout={300}
                  classNames="alert"
                >
                  <CartItem
                    product={product}
                    changeQuantity={changeQuantity}
                    handleClick={handleClick}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          <div className="cart-summary">
            <h1 className="cart-product-summary-title">ORDER SUMMARY</h1>
            <SummaruItem>
              <div className="cart-product-summary-text">Subtotal: </div>
              <div className="cart-product-summary-price">{cart.total} ₽</div>
            </SummaruItem>
            <SummaruItem>
              <div className="cart-product-summary-text">
                Estimated Shipping:
              </div>
              <div className="cart-product-summary-price">$ 5.90</div>
            </SummaruItem>
            <SummaruItem>
              <div className="cart-product-summary-text">
                Shipping Discount:{' '}
              </div>
              <div className="cart-product-summary-price">$ -5.90</div>
            </SummaruItem>
            <SummaruItem type="total">
              <div className="cart-product-summary-text">Total: </div>
              <div className="cart-product-summary-price">{cart.total} ₽</div>
            </SummaruItem>
            <StripeCheckout
              name="Get Shop"
              image="https://res.cloudinary.com/admitad-gmbh/image/upload/v1635931648/na3glepmpwzdqog5weww.jpg"
              billingAddress
              shippingAddress
              description={`Your total is ${cart.total} ₽`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <button
                disabled={cart.products.length === 0}
                className="cart-summary-btn-checkout"
              >
                Pay Now
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
