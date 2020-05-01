import React, { useState, useMemo } from 'react';
import { useGame } from 'contexts/game';
import { useWorld } from 'contexts/world';
import {
  sortDiseaseAmounts,
  sortByName,
  sortByDisease,
  sortByPriority,
} from 'utils/utils';
import classes from './CitiesScreen.module.css';

const sorters = {
  priority: sortByPriority,
  disease: sortByDisease,
  name: sortByName,
};

const CitiesScreen = ({ close }) => {
  const [order, setOrder] = useState(Object.keys(sorters)[0]);
  const { cities } = useGame();
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
          <div className={classes.cityName}>{city.name}</div>
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
