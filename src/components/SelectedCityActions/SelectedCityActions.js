import React, { useState, useCallback } from 'react';
import useProperties from 'hooks/useProperties';
import useMethods from 'hooks/useMethods';
import { CITIES, CURES } from 'data/gameData';
import classes from './SelectedCityActions.module.css';

const CurrentCityActions = ({ city }) => {
  const {
    cardsNeededToCure,
    currentPlayer,
    canBuildResearchCenter,
    canCure,
    canTreatDisease,
    highestNumberOfDiseaseCards,
  } = useProperties();
  const {
    canMoveToSameCity,
    doBuildResearchCenter,
    doCureDisease,
    doPlayerMove,
    doTreatDisease,
  } = useMethods();
  const sameCityMoves = canMoveToSameCity(city.key);
  const [cardsToDiscard, setCardsToDiscard] = useState([]);
  const selectCardToDiscard = useCallback(({ target: { checked, value } }) => {
    if (checked) {
      setCardsToDiscard((state) => [...state, value]);
    } else {
      setCardsToDiscard((state) => state.filter((c) => c !== value));
    }
  }, []);

  return (
    <>
      {canCure && (
        <div className={classes.option}>
          {highestNumberOfDiseaseCards.amount > cardsNeededToCure && (
            <>
              <p>
                Select the {cardsNeededToCure} cards you want to discard for a
                cure for {highestNumberOfDiseaseCards.disease}:
              </p>
              <div className={classes.discardOptions}>
                {currentPlayer.hand
                  .filter(
                    (card) =>
                      CITIES[card].color ===
                      highestNumberOfDiseaseCards.disease,
                  )
                  .map((card) => (
                    <label key={card} className={classes.checkboxRow}>
                      <input
                        type="checkbox"
                        checked={cardsToDiscard.includes(card)}
                        onChange={selectCardToDiscard}
                        value={card}
                      />{' '}
                      {CITIES[card].name}
                    </label>
                  ))}
              </div>
            </>
          )}
          <button
            className={classes.button}
            disabled={
              highestNumberOfDiseaseCards.amount > cardsNeededToCure &&
              cardsToDiscard.length !== cardsNeededToCure
            }
            onClick={() => {
              if (highestNumberOfDiseaseCards.amount === cardsNeededToCure) {
                doCureDisease(highestNumberOfDiseaseCards.disease);
              } else {
                doCureDisease(
                  highestNumberOfDiseaseCards.disease,
                  cardsToDiscard,
                );
              }
            }}
          >
            Discover cure for {highestNumberOfDiseaseCards.disease}
          </button>
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
        !canTreatDisease &&
        sameCityMoves.length === 0 && <p>Nothing to do here</p>}
    </>
  );
};

const OtherCityActions = ({ city }) => {
  const [moveCost, setMoveCost] = useState('');
  const { canMoveToCity, doPlayerMove } = useMethods();
  const { currentPlayer } = useProperties();
  const moves = canMoveToCity(city.key);

  return (
    <>
      {moves.map(([canMove, cost, player], index) => {
        const label = `Move ${
          player.role !== currentPlayer.role ? player.name : ''
        } to ${city.name}`;
        return (
          canMove && (
            <div key={index} className={classes.option}>
              <button
                className={classes.button}
                disabled={cost.length > 1 && moveCost === ''}
                onClick={() =>
                  doPlayerMove(
                    index,
                    city.key,
                    cost.length > 1 ? moveCost : cost[0],
                    label,
                  )
                }
              >
                {label}
              </button>
              {cost.length === 1 && (
                <p className={classes.cost}>Cost: {CITIES[cost[0]].name}</p>
              )}
              {cost.length > 1 && (
                <p className={classes.cost}>
                  Cost:{' '}
                  <select
                    value={moveCost}
                    onChange={(e) => setMoveCost(e.target.value)}
                    className={classes.select}
                  >
                    <option value="" key="default">
                      Choose a card
                    </option>
                    {cost
                      .map((card) => CITIES[card])
                      .map((cityObj) => (
                        <option key={cityObj.key} value={cityObj.key}>
                          {cityObj.name}
                        </option>
                      ))}
                  </select>
                </p>
              )}
            </div>
          )
        );
      })}
      {moves.filter(([possible]) => possible).length === 0 && (
        <p>Nothing to do here</p>
      )}
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
