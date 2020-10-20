import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useGame } from 'contexts/game';
import useProperties from 'hooks/useProperties';

const ProgressScreen = () => {
  const {
    game: { cures, diseaseProgress, playerDeck },
  } = useGame();
  const { cubesRemaining } = useProperties();
  const numCured = useMemo(() => Object.values(cures).filter(Boolean).length, [
    cures,
  ]);
  const sortedCubes = useMemo(
    () => Object.entries(cubesRemaining).sort((a, b) => b[1] - a[1]),
    [cubesRemaining],
  );
  return (
    <div>
      <h2 className="text-xl font-bold">Cure Progress</h2>
      <div className="flex mt-2 mb-4">
        {Object.entries(cures).map(([name, cured]) => (
          <div
            key={name}
            className={classnames('h-4 w-4 rounded mr-2', {
              'bg-disease-black': name === 'black',
              'bg-disease-blue': name === 'blue',
              'bg-disease-red': name === 'red',
              'bg-disease-yellow': name === 'yellow',
              'opacity-25': !cured,
            })}
          />
        ))}
        <div className="ml-4">{numCured} / 4</div>
      </div>

      <h2 className="mt-8 text-xl font-bold">Pandemic Progress</h2>
      <div className="flex mb-8">
        <div className="mr-8">
          <h3 className="mt-2 text-lg font-bold">Cubes left</h3>
          {sortedCubes.map(([name, remaining]) => (
            <div key={name} className="flex mt-2">
              <div
                className={classnames('h-4 w-4 rounded mr-2', {
                  'bg-disease-black': name === 'black',
                  'bg-disease-blue': name === 'blue',
                  'bg-disease-red': name === 'red',
                  'bg-disease-yellow': name === 'yellow',
                })}
              />
              <span className="ml-4">{remaining} / 24</span>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mt-2 text-lg font-bold">Outbreaks</h3>
          <p className="mt-1">{diseaseProgress.outbreaks} / 7</p>
          <h3 className="mt-4 text-lg font-bold">Cards left</h3>
          <p className="mt-1">{playerDeck.deck.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
