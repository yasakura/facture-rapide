import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ defaultValue, name, onChange, placeholder, type }) => (
  <div className="item-input">
    <input
      defaultValue={defaultValue}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  </div>
);

Input.defaultProps = {
  defaultValue: null,
  placeholder: '-',
  type: 'text',
};

Input.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
