import React, { useEffect, useState } from 'react';
import '../styles/Products.css';
import MySlider from './UI/MySlider/MySlider';
import ProductItem from './ProductItem';
import axios from 'axios';
import Loader from './UI/Loader/Loader';

const Products = ({ page, category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoader(true);
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : 'http://localhost:5000/api/products'
        );
        setProducts(res.data);
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [category, filters, products]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === 'desc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="prosuct-list-container">
      <div className="products-container">
        {loader ? (
          <Loader />
        ) : page === 'HomePage' ? (
          !loader && <MySlider products={products.slice(0, 8)} />
        ) : (
          category &&
          filteredProducts.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
