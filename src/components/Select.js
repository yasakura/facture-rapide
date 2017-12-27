import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ children, name, onChange, selected, value }) => (
  <div className="item-input">
    <select
      name={name}
      onChange={onChange}
      selected={selected}
      value={value}
    >
      { children }
    </select>
  </div>
);

Select.defaultProps = {
  selected: false,
};


Select.propTypes = {
  children: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default Select;
