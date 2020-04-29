import React, { useMemo } from 'react';
import { useGame } from 'contexts/game';
import useProperties from 'hooks/useProperties';
import classes from './ProgressScreen.module.css';

const ProgressScreen = () => {
  const { cures, diseaseProgress, playerDeck } = useGame();
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
      <h2>Cure Progress</h2>
      <div className={classes.cureProgress}>
        <div className={classes.numCured}>{numCured} / 4</div>
        {Object.entries(cures).map(([name, cured]) => (
          <div
            key={name}
            className={[
              classes.disease,
              classes[name],
              cured ? classes.cured : '',
            ].join(' ')}
          />
        ))}
      </div>
      <h2 className={classes.heading}>Disease progress</h2>

      <div className={classes.stats}>
        <div className={classes.stat}>
          <h3 className={classes.subHeading}>Outbreaks</h3>
          <p className={classes.progress}>{diseaseProgress.outbreaks} / 7</p>
        </div>
        <div className={classes.stat}>
          <h3 className={classes.subHeading}>Cards remaining</h3>
          <p className={classes.progress}>{playerDeck.deck.length}</p>
        </div>
      </div>
      <h3 className={classes.subHeading}>Cubes remaining</h3>
      {sortedCubes.map(([name, remaining]) => (
        <div key={name} className={classes.cubeRow}>
          <div
            className={[classes.disease, classes[name], classes.cured].join(
              ' ',
            )}
          />
          <span className={classes.numRemaining}>{remaining} / 24</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressScreen;
