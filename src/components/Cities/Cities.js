import React from 'react';
import { useCities } from 'contexts/cities';
import City from 'components/City';

import classes from './Cities.module.css';

const Cities = () => {
  const { cities } = useCities();

  return (
    <div className={classes.cities}>
      {cities.map((city) => (
        <City key={city.name} {...city} />
      ))}
    </div>
  );
};

export default Cities;
