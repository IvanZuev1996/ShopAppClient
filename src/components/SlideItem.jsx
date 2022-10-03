import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const SlideItem = ({ sliderItem, isShow }) => {
  return (
    <CSSTransition in={isShow} timeout={300} classNames="alert">
      <div className={isShow ? 'slide' : 'slide not-active-slide'}>
        <div className="slide-image-container">
          <img src={sliderItem.img} className="slide-image" />
        </div>
        <div className="slide-info-container">
          <h1 className="slider-main-title">{sliderItem.title}</h1>
          <p className="slider-price">{sliderItem.price} ₽</p>
          <p className="slider-discription">{sliderItem.desc}</p>
          <Link to={`/product/${sliderItem._id}`}>
            <div className="slider-button">SEE MORE</div>
          </Link>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SlideItem;
