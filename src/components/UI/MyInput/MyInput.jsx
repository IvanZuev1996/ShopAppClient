import React from 'react';

const MyInput = ({ element, title, setPasswordError, setConfirmError }) => {
  return (
    <div className="input">
      <input
        type="password"
        className="input-field"
        value={element.value}
        onChange={(e) => {
          element.onChange(e);
          setPasswordError && setPasswordError(false);
          setConfirmError && setConfirmError(false);
        }}
        onBlur={element.onBlur}
        required
      />
      <label className="input-label">{title}</label>
    </div>
  );
};

export default MyInput;
