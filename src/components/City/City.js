import React from 'react';
import classes from './City.module.css';

const City = ({ name, zIndex, transform, opacity }) => {
  return (
    <div className={classes.city} style={{ zIndex, transform, opacity }}>
      {name}
    </div>
  );
};

export default City;
