import React from 'react';
import { sortDiseaseAmounts } from 'utils/utils';
import PlayerToken from 'components/PlayerToken';
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
  researchCenter,
  isQuarantined,
  players,
  selectCity,
}) => {
  const infectionRows = sortDiseaseAmounts({ color, black, blue, red, yellow });
  return (
    <div
      className={[
        classes.city,
        classes[color],
        isQuarantined ? classes.quarantined : '',
      ].join(' ')}
      style={
        opacity > 0
          ? { zIndex, transform, opacity }
          : { opacity: 0, pointerEvents: 'none' }
      }
      onPointerUp={selectCity}
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
      <div className={classes.players}>
        {players.map(({ role }, index) => (
          <PlayerToken
            key={index}
            role={role}
            size="small"
            className={classes.playerToken}
          />
        ))}
      </div>
      {researchCenter && (
        <svg
          className={classes.researchCenter}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M3 22L3 10l8-8 8 8v10H3z" fill="#fff" />
        </svg>
      )}
    </div>
  );
};

export default City;
