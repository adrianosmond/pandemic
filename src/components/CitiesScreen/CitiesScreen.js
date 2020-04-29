import React, { useState, useMemo } from 'react';
import { useGame } from 'contexts/game';
import { useWorld } from 'contexts/world';
import { sortDiseaseAmounts } from 'utils/utils';
import classes from './CitiesScreen.module.css';

const colors = ['black', 'blue', 'red', 'yellow'];
const numCubes = (city) =>
  colors.map((col) => city[col]).reduce((a, b) => a + b, 0);

const sorters = {
  priority: (a, b) => {
    const aCubes = numCubes(a);
    const bCubes = numCubes(b);
    if (aCubes !== bCubes) return bCubes - aCubes;
    if (a.color !== b.color) return sorters.disease(a, b);
    return sorters.name(a, b);
  },
  disease: (a, b) => {
    if (a.color !== b.color)
      return colors.indexOf(a.color) - colors.indexOf(b.color);
    return sorters.name(a, b);
  },
  name: (a, b) => (a.name > b.name ? 1 : -1),
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
        <span>Sort by: </span>
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
          className={classes.city}
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
