import React from 'react';
import { useGame } from 'contexts/game';
import City from 'components/City';

import classes from './Cities.module.css';

const Cities = () => {
  const { cities } = useGame();

  return (
    <div className={classes.cities}>
      {cities.map((city) => (
        <City key={city.name} {...city} />
      ))}
    </div>
  );
};

export default Cities;
