import React from 'react';
import Announcement from '../components/UI/Announcement/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Static/Footer';
import Navbar from '../components/Static/Navbar';
import NewsLetter from '../components/Static/NewsLetter';
import Products from '../components/Products';
import Slider from '../components/Slider';
import SecNavbar from '../components/UI/SecNavbar/SecNavbar';

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <SecNavbar />
      <Slider />
      <Categories />
      <Products page="HomePage" />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
