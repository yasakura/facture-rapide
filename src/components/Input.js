import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ defaultValue, name, onChange, placeholder, type }) => (
  <div className="item-input">
    <input
      defaultValue={defaultValue}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

Input.defaultProps = {
  defaultValue: null,
  placeholder: '-',
  type: 'text',
};

Input.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
