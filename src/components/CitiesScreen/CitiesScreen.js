import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import { useGame } from 'contexts/game';
import { useWorld } from 'contexts/world';
import {
  sortDiseaseAmounts,
  sortByName,
  sortByDisease,
  sortByPriority,
} from 'utils/utils';
import PlayerToken from 'components/PlayerToken';

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
            className={classnames(
              'ml-2 py-1 px-0 bg-black border-bottom-transparent text-white capitalize appearance-none',
              {
                'border-disease-black border-b-2 focus:outline-none':
                  order === sort,
              },
            )}
            onClick={() => setOrder(sort)}
          >
            {sort}
          </button>
        ))}
      </div>
      {sortedCities.map((city) => (
        <button
          className={classnames(
            'flex items-center w-full mt-2 p-2 bg-black text-white text-left appearance-none border border-white border-opacity-50',
            {
              'text-disease-black': city.color === 'black',
              'text-disease-blue': city.color === 'blue',
              'text-disease-red': city.color === 'red',
              'text-disease-yellow': city.color === 'yellow',
            },
          )}
          key={city.key}
          onClick={() => {
            close();
            panToCity(city.key);
          }}
        >
          <div className="flex items-center flex-grow text-base leading-none">
            {city.researchCenter && (
              <svg
                className="relative top-px w-3 h-3 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M3 22L3 10l8-8 8 8v10H3z" fill="#fff" />
              </svg>
            )}
            {city.name}
            <div className="flex ml-1">
              {players
                .filter((player) => player.location === city.key)
                .map(({ role }) => (
                  <PlayerToken
                    role={role}
                    size="small"
                    key={role}
                    className="ml-px"
                  />
                ))}
            </div>
          </div>
          <div className="flex">
            {city.disease.map(([col, amt]) => (
              <div className="flex" key={col}>
                <div
                  className={classnames('h-1 w-1 ml-1 rounded opacity-25', {
                    'bg-disease-black': col === 'black',
                    'bg-disease-blue': col === 'blue',
                    'bg-disease-red': col === 'red',
                    'bg-disease-yellow': col === 'yellow',
                    'opacity-100': amt > 0,
                  })}
                ></div>
                <div
                  className={classnames('h-1 w-1 ml-1 rounded opacity-25', {
                    'bg-disease-black': col === 'black',
                    'bg-disease-blue': col === 'blue',
                    'bg-disease-red': col === 'red',
                    'bg-disease-yellow': col === 'yellow',
                    'opacity-100': amt > 1,
                  })}
                ></div>
                <div
                  className={classnames('h-1 w-1 ml-1 rounded opacity-25', {
                    'bg-disease-black': col === 'black',
                    'bg-disease-blue': col === 'blue',
                    'bg-disease-red': col === 'red',
                    'bg-disease-yellow': col === 'yellow',
                    'opacity-100': amt > 2,
                  })}
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
