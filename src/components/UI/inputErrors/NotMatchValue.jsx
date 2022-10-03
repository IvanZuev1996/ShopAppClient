import React from 'react';

const NotMatchValue = ({ condition }) => {
  return (
    <div>
      {condition && (
        <div className="not-valid-massange">Пароли не совпадают!</div>
      )}
    </div>
  );
};

export default NotMatchValue;
