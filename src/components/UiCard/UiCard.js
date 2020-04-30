import React from 'react';
import classes from './UiCard.module.css';

const UiCard = ({ children }) => (
  <div className={classes.uiCard}>{children}</div>
);

export default UiCard;
