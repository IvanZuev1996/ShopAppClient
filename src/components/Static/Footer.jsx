import React from 'react';
import '../../styles/Footer.css';
import styled from 'styled-components';
import {
  Facebook,
  Instagram,
  Pinterest,
  Twitter,
  LocationOn,
  LocalPhone,
  Mail,
} from '@mui/icons-material';
import { links } from '../../data.js';
import { Link } from 'react-router-dom';

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 3px;
  background-color: #${(props) => props.color};
`;

const FooterLink = {
  display: 'block',
  textDecoration: 'none',
  color: 'black',
};

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <h1 className="footer-logo">GET. YOUR. SNEAKERS</h1>
        <p className="footer-desc">
          When ordering delivery in Moscow and beyond the MKAD (to the concrete
          ring), you can order two sizes of one product for fitting and choose
          the one that fits.
        </p>
        <div className="footer-social-media">
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </div>
      </div>
      <div className="footer-center">
        <div className="footer-center-title">Useful Links</div>
        <div className="footer-list">
          {links.map((item) => (
            <div className="footer-link" key={item.id}>
              <Link to={item.path} style={FooterLink}>
                <div>{item.link}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-contact">Contact</div>
        <div className="footer-contact-items">
          <div className="contact-item">
            <div className="contact-icon">
              <LocationOn />
            </div>
            622 Dixie Path, South Tobinchester 18336
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <LocalPhone />
            </div>
            <div>+7 321 654 32 11</div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <Mail />
            </div>
            contact@get.your.sneakers.dev
          </div>
        </div>
        <img
          src="https://mysiteforsoreeyes.com/wp-content/uploads/2017/05/payment-icons.png"
          className="payment-image"
        />
      </div>
    </div>
  );
};

export default Footer;
