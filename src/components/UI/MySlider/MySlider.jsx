import React from 'react';
import ProductItem from '../../ProductItem';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const MySlider = ({ products }) => {
  const { width } = useWindowDimensions();
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={
        width >= 1400
          ? 5
          : width >= 1100
          ? 4
          : width >= 768
          ? 3
          : width >= 415
          ? 2
          : 1
      }
      navigation
      grabCursor={true}
      pagination={{ clickable: true }}
    >
      {products.map((item) => (
        <SwiperSlide key={item._id}>
          <ProductItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySlider;
