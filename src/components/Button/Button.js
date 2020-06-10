import React from 'react';
import classes from './Button.module.css';

const Button = ({ className, onClick, disabled, children }) => (
  <button
    className={[classes.button, className].join(' ')}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
