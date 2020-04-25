import React from 'react';
import classes from './City.module.css';

const City = ({ name, zIndex, transform, opacity, color, infections }) => {
  const infectionRows = Object.entries(infections)
    .filter(([col, number]) => col === color || number > 0)
    .sort((a, b) => {
      if (a === color) return -1;
      if (b === color) return 1;
      return a < b ? -1 : 1;
    });
  return (
    <div className={classes.city} style={{ zIndex, transform, opacity }}>
      {name}
      {infectionRows.map(([col, count], index) => (
        <div className={classes.infectionRow} key={index}>
          <div
            className={[
              classes.pill,
              classes[col],
              count > 0 ? classes.filled : '',
            ].join(' ')}
          ></div>
          <div
            className={[
              classes.pill,
              classes[col],
              count > 1 ? classes.filled : '',
            ].join(' ')}
          ></div>
          <div
            className={[
              classes.pill,
              classes[col],
              count > 2 ? classes.filled : '',
            ].join(' ')}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default City;
