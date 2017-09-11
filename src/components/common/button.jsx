import React from 'react';
import { PropTypes } from 'prop-types';

const Button = ({ onClick, children }) =>
  <button
    onClick={onClick}
    type="button"
  >
    {children}
  </button>

Button.PropTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Button;
