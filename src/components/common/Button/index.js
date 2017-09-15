import React from 'react';
import { PropTypes } from 'prop-types';

const Button = ({ onClick, children }) =>
  <button type="button" onClick={onClick}>
    {children}
  </button>

Button.PropTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Button;
