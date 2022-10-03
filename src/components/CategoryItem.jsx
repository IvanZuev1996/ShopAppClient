import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryItem.scss';

const CategoryItem = ({ item }) => {
  return (
    <div className="category-item-container">
      <Link to={`/products/${item.category}`}>
        <div className="images">
          <div className="image-link">
            <div className="image" data-label={item.title}>
              <img src={item.img} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
