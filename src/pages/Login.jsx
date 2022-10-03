import React from 'react';
import { useState } from 'react';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import { publicRequest, userRequest } from '../requestMethods';
import { CSSTransition } from 'react-transition-group';
import '../styles/Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isFetching, error } = useSelector((state) => state.user);
  const [userError, setUserError] = useState(error);
  const dispatch = useDispatch();

  const getProduct = async (id) => {
    try {
      const res = await publicRequest.get(`/products/find/${id}`);
      return res.data;
    } catch (err) {}
  };

  const handleClick = (e) => {
    e.preventDefault();
    const getCart = async (user) => {
      const res = await userRequest(user.accessToken).get(
        `/carts/find/${user._id}`
      );
      const userCart = res.data;
      userCart.products.map(async (el) => {
        const response = await getProduct(
          el._id.includes('+') ? el._id.substr(0, el._id.indexOf('+')) : el._id
        );
        dispatch(
          addProduct({ ...response, quantity: el.quantity, size: el.size })
        );
      });
    };
    login(dispatch, { username, password }, getCart, setUserError);
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-image">
          <h2 className="card-heading">
            LOG IN
            <small>Welcome back...</small>
          </h2>
        </div>
        <form className="card-form">
          <div className="input">
            <input
              type="text"
              className="input-field"
              required
              onChange={(e) => {
                setUsername(e.target.value);
                setUserError(false);
              }}
            />
            <label className="input-label">NickName</label>
          </div>
          <div className="input">
            <input
              type="password"
              className="input-field"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setUserError(false);
              }}
            />
            <label className="input-label">Password</label>
          </div>
          <div className="action">
            <button
              className="action-button"
              onClick={handleClick}
              disabled={isFetching}
            >
              GO SHOPPING!
            </button>
          </div>
          <CSSTransition
            in={userError}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            <p className="errorAuth">Invalid username or password...</p>
          </CSSTransition>
        </form>
        <div className="card-info">
          <div className="login-links">
            <a className="forgot-password">DO NOT YOU REMEMBER THE PASSWARD?</a>
            <a className="login-create-account-link">CREATE A NEW ACCOUNT</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
