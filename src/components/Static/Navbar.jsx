import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.scss';
import { logout } from '../../redux/userRedux';
import { cleanCart } from '../../redux/cartRedux';

const NavbarLink = {
  display: 'block',
  textDecoration: 'none',
  color: 'black',
};

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    dispatch(cleanCart());
  };

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="left-navbar-content">
          <span className="navbar-lan">EN</span>
          <div className="navbar-search-container">
            <input type="text" className="navbar-input" placeholder="Search" />
            <Search className="navbar-search-icon" />
          </div>
        </div>
        <div className="center-navbar-content">
          <Link to="/" style={NavbarLink}>
            <h4 className="wordCarousel">
              <div>
                <ul className="flip2">
                  <li>GET. YOUR. SNEAKERS</li>
                  <li>STREET BEET CLONE</li>
                </ul>
              </div>
            </h4>
          </Link>
          <Link to="/" style={NavbarLink}>
            <h1 className="navbar-logo-mobile">GET.</h1>
          </Link>
        </div>
        <div className="right-navbar-content">
          {!user ? (
            <>
              <Link to="/register" style={NavbarLink}>
                <button className="auth-button">
                  <span>REGISTER</span>
                </button>
              </Link>
              <Link to="/login" style={NavbarLink}>
                <button className="auth-button sing-in-btn">
                  <span>SIGN IN</span>
                </button>
              </Link>
            </>
          ) : (
            <Link to="/" style={NavbarLink}>
              <button className="auth-button sing-in-btn" onClick={handleClick}>
                <span>LOG OUT</span>
              </button>
            </Link>
          )}

          <Link to="/cart" style={NavbarLink} className="navbar-cart-link">
            <Badge
              badgeContent={quantity}
              color="primary"
              className="cart-icon-wrapper"
            >
              <ShoppingCartOutlined className="navbar-cart-icon" />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
