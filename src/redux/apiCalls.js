import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
} from './userRedux';
import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user, getCart, setUserError) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    getCart(res.data);
    setUserError(false);
  } catch (err) {
    dispatch(loginFailure());
    setUserError(true);
  }
};

export const register = async (dispatch, user, createCart) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post('/auth/register', user);
    await dispatch(registerSuccess(res.data));
    const response = await publicRequest.post('/auth/login', user);
    await dispatch(loginSuccess(response.data));
    createCart(response.data);
  } catch (err) {
    dispatch(registerFailure());
  }
};
