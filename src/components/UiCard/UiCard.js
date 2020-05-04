import React from 'react';
import classes from './UiCard.module.css';

const UiCard = ({ children, className }) => (
  <div className={[classes.uiCard, className].join(' ')}>{children}</div>
);

export default UiCard;
