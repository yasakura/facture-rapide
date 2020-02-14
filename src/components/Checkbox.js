import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ isChecked, name, onClick }) => (
  // <input
  //   name={name}
  //   onChange={onChange}
  //   type="checkbox"
  //   defaultChecked={defaultChecked}
  // />
  <div
    className="item-input"
    style={{
      display: 'flex',
      alignItems: 'end',
      justifyContent: 'flex-end',
    }}
  >
    {/* eslint-disable */}
    <label className="label-switch" onClick={onClick}>
    { /* eslint-enable */ }
      <input name={name} type="checkbox" defaultChecked={isChecked} />
      <div className="checkbox" data-name={name} />
    </label>
  </div>
);

Checkbox.defaultProps = {
  // defaultValue: null,
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default Checkbox;
