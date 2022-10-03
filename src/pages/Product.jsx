import React, { useState } from 'react';
import Announcement from '../components/UI/Announcement/Announcement';
import Footer from '../components/Static/Footer';
import Navbar from '../components/Static/Navbar';
import NewsLetter from '../components/Static/NewsLetter';
import '../styles/Product.scss';
import styled from 'styled-components';
import { Add, Remove, West } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { publicRequest, userRequest } from '../requestMethods';
import { addProduct, updateProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader/Loader';

const FilterColor = styled.div`
  margin-left: 5px;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const FilterSize = styled.option`
  margin-left: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const BackButton = {
  cursor: 'pointer',
  position: 'absolute',
};

const Product = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const dispatch = useDispatch();

  const handleQuantity = (prop) => {
    if (prop === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (prop === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = async () => {
    dispatch(
      addProduct({
        ...product,
        quantity,
        size,
        isHave: true,
      })
    );
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const res = await publicRequest.get(`/products/find/${id}`);
        setSize(res.data.size[0]);
        setProduct(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const updateCart = async () => {
      user &&
        (await userRequest(user.accessToken).put(`/carts/${user._id}`, cart));
    };
    updateCart();
  }, [cart]);

  return (
    <div className="product-container">
      <Navbar />
      <Announcement />
      {isLoading ? (
        <div className="product-loader">
          <Loader />
        </div>
      ) : (
        <div>
          <West
            style={BackButton}
            className="product-back-btn"
            onClick={() => navigate(-1)}
          ></West>
          <div className="product-content-wrapper">
            <div className="product-image-wrapper">
              <img src={product.img} className="product-image-on-page" />
            </div>
            <div className="product-info-wrapper">
              <h1 className="main-product-title">{product.title}</h1>
              <p className="product-desc">{product.desc}</p>
              <div className="product-price">{`${product.price} ₽`}</div>
              <div className="product-filter-container">
                <div className="product-filter">
                  <div className="product-filter-title">Color</div>
                  {product.color?.map((c) => (
                    <FilterColor color={c} key={c} />
                  ))}
                </div>
                <div className="product-filter">
                  <div className="product-filter-title">Size</div>
                  <select
                    size="1"
                    className="size-items"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {product.size?.map((item) => (
                      <FilterSize key={item}>{item}</FilterSize>
                    ))}
                  </select>
                </div>
              </div>
              <div className="product-add-to-cart">
                <div className="product-amount-wrapper">
                  <div
                    className="dicrement"
                    onClick={() => handleQuantity('dec')}
                  >
                    <Remove />
                  </div>
                  <div className="product-amount">{quantity}</div>
                  <div
                    className="increment"
                    onClick={() => handleQuantity('inc')}
                  >
                    <Add />
                  </div>
                </div>
                <a className="btn-add-to-cart" onClick={handleClick}>
                  ADD TO CART
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Product;
