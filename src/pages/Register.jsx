import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/apiCalls';
import { userRequest } from '../requestMethods';
import { useInput } from '../hooks/useInput.js';
import { logout } from '../redux/userRedux';
import '../styles/Register.scss';
import Loader from '../components/UI/Loader/Loader';

const Register = () => {
  const name = useInput('', { isEmpty: true });
  const lastName = useInput('', { isEmpty: true });
  const userName = useInput('', { isEmpty: true });
  const email = useInput('', { isEmpty: true, isEmail: true });
  const password = useInput('', { isEmpty: true });
  const confirmPassword = useInput('', { isEmpty: true });
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const createCart = async (user) => {
      await userRequest(user.accessToken).post('/carts', {
        _id: user._id,
        userId: user._id,
        products: [],
      });
    };
    register(
      dispatch,
      {
        name: name.value,
        lastname: lastName.value,
        username: userName.value,
        password: password.value,
        email: email.value,
      },
      createCart
    );
  };

  useEffect(() => {
    dispatch(logout());
  }, []);

  return (
    <div className="register-container">
      <div className="card">
        <div className="card-image">
          <h2 className="card-heading">
            REGISTER
            <small>Welcome...</small>
          </h2>
        </div>
        <form className="card-form">
          <div className="input">
            {name.isDirty && name.isEmpty && (
              <div className="not-valid-massange">
                Поле не может быть пустым
              </div>
            )}
            <input
              value={name.value}
              onChange={name.onChange}
              onBlur={name.onBlur}
              type="text"
              className="input-field"
              required
            />
            <label className="input-label">Name</label>
          </div>
          <div className="input">
            {lastName.isDirty && lastName.isEmpty && (
              <div className="not-valid-massange">
                Поле не может быть пустым
              </div>
            )}
            <input
              value={lastName.value}
              onChange={lastName.onChange}
              onBlur={lastName.onBlur}
              type="text"
              className="input-field"
              required
            />
            <label className="input-label">Last Name</label>
          </div>
          <div className="input">
            {userName.isDirty && userName.isEmpty && (
              <div className="not-valid-massange">
                Поле не может быть пустым
              </div>
            )}
            {error && (
              <div className="errorRegister">
                A user with this name already exists
              </div>
            )}
            <input
              type="text"
              className="input-field"
              required
              value={userName.value}
              onChange={userName.onChange}
              onBlur={userName.onBlur}
            />
            <label className="input-label">UserName</label>
          </div>
          <div className="input">
            {email.isDirty && email.isEmpty && (
              <div className="not-valid-massange">
                Поле не может быть пустым
              </div>
            )}
            {email.isDirty && email.emailError && !email.isEmpty && (
              <div className="not-valid-massange">Введите корректный email</div>
            )}
            <input
              type="text"
              className="input-field"
              required
              value={email.value}
              onChange={email.onChange}
              onBlur={email.onBlur}
            />
            <label className="input-label">Email</label>
          </div>
          <div className="input">
            {password.isDirty && password.isEmpty && (
              <div className="not-valid-massange">
                Поле не может быть пустым
              </div>
            )}
            <input
              type="password"
              className="input-field"
              required
              value={password.value}
              onChange={password.onChange}
              onBlur={password.onBlur}
            />
            <label className="input-label">Password</label>
          </div>
          <div className="input">
            {confirmPassword.isDirty && confirmPassword.isEmpty && (
              <div className="not-valid-massange">
                Поле не может быть пустым
              </div>
            )}
            <input
              type="password"
              className="input-field"
              required
              value={confirmPassword.value}
              onChange={confirmPassword.onChange}
              onBlur={confirmPassword.onBlur}
            />
            <label className="input-label">Confirm password</label>
          </div>
          <div className="action">
            <button
              className="action-button"
              onClick={handleClick}
              disabled={
                isFetching ||
                !name.inputValid ||
                !lastName.inputValid ||
                !userName.inputValid ||
                !email.inputValid ||
                !password.inputValid ||
                !confirmPassword.inputValid
              }
            >
              {isFetching ? <Loader /> : 'GET STARTED'}
            </button>
          </div>
          <div className="regiser-aggreement">
            By creating an account, I consent to the proccessing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
