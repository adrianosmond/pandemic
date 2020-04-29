import React from 'react';
import { sortDiseaseAmounts } from 'utils/utils';
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
  const infectionRows = sortDiseaseAmounts({ color, black, blue, red, yellow });
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
