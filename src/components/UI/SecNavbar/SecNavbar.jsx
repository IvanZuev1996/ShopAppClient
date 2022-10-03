import React, { useState } from 'react';
import classes from './SecNavbar.module.scss';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';

const SecNavbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className={classes.secondNavbarWrapper}>
      <div className={classes.secondNavbarLeftContent}>
        <Link
          to="/products/man"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <p className={classes.secondNavbarLink}>For man</p>
        </Link>
        <Link
          to="/products/woman"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <p className={classes.secondNavbarLink}>For women</p>
        </Link>
        <Link
          to="/products/children"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <p className={classes.secondNavbarLink}>For children</p>
        </Link>
      </div>
      <div className={classes.secondNavbarRightContent}>
        <Link to={user ? `/personal` : '/login'} style={{ color: 'black' }}>
          <div className={classes.accountLink}>
            <p className={classes.secondNavbarLink}>Personal account</p>
            <AccountCircleOutlinedIcon />
          </div>
        </Link>
        <Badge badgeContent={1} color="secondary">
          <FavoriteBorderIcon style={{ cursor: 'pointer' }} />
        </Badge>
      </div>
    </div>
  );
};

export default SecNavbar;
