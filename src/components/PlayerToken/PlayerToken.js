import React from 'react';
import classes from './PlayerToken.module.css';

const PlayerToken = ({ role, size = 'normal', className }) => (
  <div
    className={[
      classes.playerToken,
      classes[role],
      classes[size],
      className,
    ].join(' ')}
  />
);

export default PlayerToken;
