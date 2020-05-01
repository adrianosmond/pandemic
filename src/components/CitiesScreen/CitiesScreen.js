import React, { useState, useMemo } from 'react';
import { useGame } from 'contexts/game';
import { useWorld } from 'contexts/world';
import {
  sortDiseaseAmounts,
  sortByName,
  sortByDisease,
  sortByPriority,
} from 'utils/utils';
import PlayerToken from 'components/PlayerToken';
import classes from './CitiesScreen.module.css';

const sorters = {
  priority: sortByPriority,
  disease: sortByDisease,
  name: sortByName,
};

const CitiesScreen = ({ close }) => {
  const [order, setOrder] = useState(Object.keys(sorters)[0]);
  const { cities, players } = useGame();
  const { panToCity } = useWorld();
  const sortedCities = useMemo(
    () =>
      Object.entries(cities)
        .map(([key, obj]) => ({
          ...obj,
          key,
          disease: sortDiseaseAmounts(obj),
        }))
        .sort(sorters[order]),
    [cities, order],
  );

  return (
    <div>
      <div>
        <span>Sort by:</span>
        {Object.keys(sorters).map((sort) => (
          <button
            key={sort}
            className={[
              classes.sortButton,
              order === sort ? classes.activeButton : '',
            ].join(' ')}
            onClick={() => setOrder(sort)}
          >
            {sort}
          </button>
        ))}
      </div>
      {sortedCities.map((city) => (
        <button
          className={[classes.city, classes[`city--${city.color}`]].join(' ')}
          key={city.key}
          onClick={() => {
            close();
            panToCity(city.key);
          }}
        >
          <div className={classes.cityName}>
            {city.researchCenter && (
              <svg
                className={classes.researchCenter}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M3 22L3 10l8-8 8 8v10H3z" fill="#fff" />
              </svg>
            )}
            {city.name}
            <div className={classes.players}>
              {players
                .filter((player) => player.location === city.key)
                .map(({ role }) => (
                  <PlayerToken
                    role={role}
                    size="small"
                    key={role}
                    className={classes.player}
                  />
                ))}
            </div>
          </div>
          <div className={classes.diseases}>
            {city.disease.map(([col, amt]) => (
              <div className={classes.disease} key={col}>
                <div
                  className={[
                    classes.pill,
                    classes[col],
                    amt > 0 ? classes.filled : '',
                  ].join(' ')}
                ></div>
                <div
                  className={[
                    classes.pill,
                    classes[col],
                    amt > 1 ? classes.filled : '',
                  ].join(' ')}
                ></div>
                <div
                  className={[
                    classes.pill,
                    classes[col],
                    amt > 2 ? classes.filled : '',
                  ].join(' ')}
                ></div>
              </div>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
};

export default CitiesScreen;
