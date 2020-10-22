import React, { useState, useCallback } from 'react';
import useProperties from 'hooks/useProperties';
import useMethods from 'hooks/useMethods';
import { CITIES, CURES } from 'data/gameData';
import Button from 'components/Button';
import { useGame } from 'contexts/game';
import Select from 'components/Select/Select';

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
  const {
    game: { turn },
  } = useGame();
  const sameCityMoves = canMoveToSameCity(city.key);
  const [cardsToDiscard, setCardsToDiscard] = useState([]);
  const selectCardToDiscard = useCallback(({ target: { checked, value } }) => {
    if (checked) {
      setCardsToDiscard((state) => [...state, value]);
    } else {
      setCardsToDiscard((state) => state.filter((c) => c !== value));
    }
  }, []);

  if (turn.actions.length > 3) {
    return <p>No more actions left in this turn</p>;
  }

  if (
    !canBuildResearchCenter &&
    !canCure &&
    !canTreatDisease &&
    sameCityMoves.length === 0
  ) {
    return <p>Nothing to do here</p>;
  }

  return (
    <>
      {canCure && (
        <div className="mt-4">
          {highestNumberOfDiseaseCards.amount > cardsNeededToCure && (
            <>
              <p>
                Select the {cardsNeededToCure} cards you want to discard for a
                cure for {highestNumberOfDiseaseCards.disease}:
              </p>
              <div className="my-4">
                {currentPlayer.hand
                  .filter(
                    (card) =>
                      CITIES[card].color ===
                      highestNumberOfDiseaseCards.disease,
                  )
                  .map((card) => (
                    <label key={card} className="flex my-1">
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
          <Button
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
          </Button>
        </div>
      )}
      {canTreatDisease && (
        <div className="mt-4">
          {Object.keys(CURES).map((color) =>
            city[color] === 0 ? null : (
              <Button
                key={color}
                onClick={() => doTreatDisease(currentPlayer, color)}
              >
                Treat {color}
              </Button>
            ),
          )}
        </div>
      )}
      {canBuildResearchCenter && (
        <div className="mt-4">
          <Button onClick={() => doBuildResearchCenter(city.key)}>
            Build research center
          </Button>
        </div>
      )}
      {sameCityMoves.map(([canMove, player], index) => {
        const label = `Move ${
          player.role !== currentPlayer.role ? player.name : ''
        } to ${city.name}`;
        return canMove ? (
          <div key={index} className="mt-4">
            <Button onClick={() => doPlayerMove(index, city.key, null, label)}>
              {label}
            </Button>
          </div>
        ) : null;
      })}
    </>
  );
};

const OtherCityActions = ({ city }) => {
  const [moveCost, setMoveCost] = useState('');
  const {
    game: { turn },
  } = useGame();
  const { canMoveToCity, doPlayerMove } = useMethods();
  const { currentPlayer } = useProperties();
  const moves = canMoveToCity(city.key);

  if (turn.actions.length > 3) {
    return <p>No more actions left in this turn</p>;
  }

  if (moves.filter(([possible]) => possible).length === 0) {
    return <p>Nothing to do here</p>;
  }

  return (
    <>
      {moves.map(([canMove, cost, player], index) => {
        const label = `Move ${
          player.role !== currentPlayer.role ? player.name : ''
        } to ${city.name}`;
        return (
          canMove && (
            <div key={index} className="mt-4">
              <Button
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
              </Button>
              {cost.length === 1 && (
                <p className="mt-2">Cost: {CITIES[cost[0]].name}</p>
              )}
              {cost.length > 1 && (
                <p className="mt-2">
                  Cost:{' '}
                  <Select
                    value={moveCost}
                    onChange={(e) => setMoveCost(e.target.value)}
                    options={cost.map((card) =>
                      CITIES[card].map((cityObj) => ({
                        value: cityObj.key,
                        label: cityObj.name,
                      })),
                    )}
                    defaultOption="Choose a card"
                  />
                </p>
              )}
            </div>
          )
        );
      })}
    </>
  );
};

const SelectedCityActions = ({ city }) => {
  const selectedCity = CITIES[city];
  const { currentCity } = useProperties();
  return (
    <div style={{ minWidth: '260px' }}>
      <h2 className="mb-4 text-xl font-bold">{selectedCity.name}</h2>
      {selectedCity.name === currentCity.name ? (
        <CurrentCityActions city={selectedCity} />
      ) : (
        <OtherCityActions city={selectedCity} />
      )}
    </div>
  );
};

export default SelectedCityActions;
