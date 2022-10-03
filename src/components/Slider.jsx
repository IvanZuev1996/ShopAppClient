import React, { useEffect, useState } from 'react';
import '../styles/Slider.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import SlideItem from './SlideItem';
import axios from 'axios';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderItems, setSliderItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const hadleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setSliderItems(res.data.slice(0, 5));
      } catch (err) {
        setIsFetching(false);
      }
    };
    getProducts();
    setSlideIndex(1);
    setIsFetching(false);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider-left-arrow" onClick={() => hadleClick('left')}>
        <ArrowLeftOutlined />
      </div>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((sliderItem, index) => (
          <SlideItem
            sliderItem={sliderItem}
            key={sliderItem._id}
            isShow={index === slideIndex}
          />
        ))}
      </Wrapper>
      <div className="slider-right-arrow" onClick={() => hadleClick('right')}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
