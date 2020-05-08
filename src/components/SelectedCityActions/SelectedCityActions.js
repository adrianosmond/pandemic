import React, { useState } from 'react';
import useProperties from 'hooks/useProperties';
import useMethods from 'hooks/useMethods';
import { CITIES, CURES } from 'data/gameData';
import classes from './SelectedCityActions.module.css';

const CurrentCityActions = ({ city }) => {
  const {
    currentPlayer,
    canBuildResearchCenter,
    canCure,
    canShareKnowledge,
    canTreatDisease,
  } = useProperties();
  const {
    canMoveToSameCity,
    doBuildResearchCenter,
    doPlayerMove,
    doTreatDisease,
  } = useMethods();
  const sameCityMoves = canMoveToSameCity(city.key);

  return (
    <>
      {canCure && (
        <div className={classes.option}>
          <button className={classes.button}>Discover cure</button>
        </div>
      )}
      {canTreatDisease && (
        <div className={classes.option}>
          {Object.keys(CURES).map((color) =>
            city[color] === 0 ? null : (
              <button
                key={color}
                className={classes.button}
                onClick={() => doTreatDisease(currentPlayer, color)}
              >
                Treat {color}
              </button>
            ),
          )}
        </div>
      )}
      {canShareKnowledge && (
        <div className={classes.option}>
          <button className={classes.button}>Share knowledge</button>
        </div>
      )}
      {canBuildResearchCenter && (
        <div className={classes.option}>
          <button
            className={classes.button}
            onClick={() => doBuildResearchCenter(city.key)}
          >
            Build research center
          </button>
        </div>
      )}
      {sameCityMoves.map(([canMove, player], index) => {
        const label = `Move ${
          player.role !== currentPlayer.role ? player.name : ''
        } to ${city.name}`;
        return canMove ? (
          <div key={index} className={classes.option}>
            <button
              className={classes.button}
              onClick={() => doPlayerMove(index, city.key, null, label)}
            >
              {label}
            </button>
          </div>
        ) : null;
      })}
      {!canBuildResearchCenter &&
        !canCure &&
        !canShareKnowledge &&
        !canTreatDisease &&
        sameCityMoves.length === 0 && <p>Nothing to do here</p>}
    </>
  );
};

const OtherCityActions = ({ city }) => {
  const [opsExpertMoveCost, setOpsExpertMoveCost] = useState('');
  const { canMoveToCity, doPlayerMove } = useMethods();
  const {
    currentPlayer,
    currentPlayerIdx,
    canDoOperationsExpertMove,
  } = useProperties();
  const moves = canMoveToCity(city.key);

  return (
    <>
      {moves.map(([canMove, cost, player], index) => {
        const label = `Move ${
          player.role !== currentPlayer.role ? player.name : ''
        } to ${city.name}`;
        return canMove && !(cost && canDoOperationsExpertMove) ? (
          <div key={index} className={classes.option}>
            <button
              className={classes.button}
              onClick={() => doPlayerMove(index, city.key, cost, label)}
            >
              {label}
            </button>
            {cost && <p className={classes.cost}>Cost: {CITIES[cost].name}</p>}
          </div>
        ) : null;
      })}
      {canDoOperationsExpertMove &&
      (!moves[0][0] || moves[0][1]) && ( // only show this if we can't move here for free
          <>
            <div className={classes.option}>
              <button
                className={classes.button}
                disabled={opsExpertMoveCost === ''}
                onClick={() =>
                  doPlayerMove(
                    currentPlayerIdx,
                    city.key,
                    opsExpertMoveCost,
                    `Move to ${city.name}`,
                  )
                }
              >
                Move to {city.name}
              </button>
            </div>
            <p className={classes.cost}>
              Cost:{' '}
              <select
                value={opsExpertMoveCost}
                onChange={(e) => setOpsExpertMoveCost(e.target.value)}
                className={classes.select}
              >
                <option value="" key="default">
                  Choose a card
                </option>
                {currentPlayer.hand
                  .map((card) => CITIES[card])
                  .filter(Boolean)
                  .map((cityObj) => (
                    <option key={cityObj.key} value={cityObj.key}>
                      {cityObj.name}
                    </option>
                  ))}
              </select>
            </p>
          </>
        )}
      {moves.filter(([possible]) => possible).length === 0 &&
        !canDoOperationsExpertMove && <p>Nothing to do here</p>}
    </>
  );
};

const SelectedCityActions = ({ city }) => {
  const selectedCity = CITIES[city];
  const { currentCity } = useProperties();
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.cityName}>{selectedCity.name}</h2>
      {selectedCity.name === currentCity.name ? (
        <CurrentCityActions city={selectedCity} />
      ) : (
        <OtherCityActions city={selectedCity} />
      )}
    </div>
  );
};

export default SelectedCityActions;
