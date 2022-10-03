import React from 'react';

const NotValidInput = ({ condition }) => {
  return (
    <div>
      {condition && <div className="not-valid-massange">Неверный пароль!</div>}
    </div>
  );
};

export default NotValidInput;
