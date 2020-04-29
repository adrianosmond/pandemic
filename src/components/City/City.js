import React from 'react';
import classes from './City.module.css';

const City = ({
  name,
  zIndex,
  transform,
  opacity,
  color,
  black,
  blue,
  red,
  yellow,
}) => {
  const infectionRows = Object.entries({
    black,
    blue,
    red,
    yellow,
  })
    .filter(([col, number]) => col === color || number > 0)
    .sort((a, b) => {
      if (a[1] === b[1]) return a[0] === color ? -1 : 1;
      return b[1] - a[1];
    });
  return (
    <div
      className={[classes.city, classes[color]].join(' ')}
      style={{ zIndex, transform, opacity }}
    >
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
