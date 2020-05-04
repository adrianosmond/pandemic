import React from 'react';
import { CITIES, CURES } from 'data/gameData';
import useProperties from 'hooks/useProperties';
import useMethods from 'hooks/useMethods';
import classes from './SelectedCityActions.module.css';

const CurrentCityActions = ({ city }) => {
  const {
    canBuildResearchCenter,
    canCure,
    canMoveToSameCity,
    canShareKnowledge,
    canTreatDisease,
  } = useProperties();

  return (
    <>
      {canCure && (
        <div>
          <button className={classes.button}>Discover cure</button>
        </div>
      )}
      {canTreatDisease && (
        <div>
          {Object.keys(CURES).map((color) =>
            city[color] === 0 ? null : (
              <button key={color}>Treat {color}</button>
            ),
          )}
        </div>
      )}
      {canShareKnowledge && (
        <div>
          <button className={classes.button}>Share knowledge</button>
        </div>
      )}
      {canBuildResearchCenter && (
        <div>
          <button className={classes.button}>Build research center</button>
        </div>
      )}
      {canMoveToSameCity && (
        <div>
          <button className={classes.button}>Move X here</button>
        </div>
      )}
      {!canCure &&
        !canTreatDisease &&
        !canShareKnowledge &&
        !canBuildResearchCenter &&
        !canMoveToSameCity && <p>Nothing to do here</p>}
    </>
  );
};

const OtherCityActions = ({ city }) => {
  const { canMoveToCity } = useMethods();
  const { currentPlayer } = useProperties();
  const validMoves = canMoveToCity(city.key).filter(([possible]) => possible);

  return (
    <>
      {validMoves.map(([canMove, cost, playerName], index) =>
        canMove ? (
          <div key={index}>
            <button className={classes.button}>
              Move {playerName !== currentPlayer.name ? playerName : ''} to{' '}
              {city.name}
            </button>
            {cost && <p>Cost: {cost}</p>}
          </div>
        ) : null,
      )}
      {validMoves.length === 0 && <p>Nothing to do here</p>}
    </>
  );
};

const SelectedCityActions = ({ city }) => {
  const selectedCity = {
    ...CITIES[city],
    key: city,
  };
  const { currentCity } = useProperties();
  return (
    <div className={classes.wrapper}>
      <h2>{selectedCity.name}</h2>
      {selectedCity === currentCity ? (
        <CurrentCityActions city={selectedCity} />
      ) : (
        <OtherCityActions city={selectedCity} />
      )}
    </div>
  );
};

export default SelectedCityActions;
