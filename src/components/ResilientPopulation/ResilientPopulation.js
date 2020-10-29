import { useCallback, useMemo, useState } from 'react';
import { useGame } from 'contexts/game';
import useMethods from 'hooks/useMethods';
import { ConfirmModal } from 'components/Modal';
import { CITIES } from 'data/gameData';
import Select from 'components/Select';
import Typography from 'components/Typography';

const ResilientPopulation = ({ closeModal }) => {
  const {
    game: { infectionDeck },
  } = useGame();
  const { resilientPopulation } = useMethods();
  const citiesArray = useMemo(
    () =>
      Object.values(infectionDeck.discard)
        .sort((a, b) => (a > b ? 1 : -1))
        .map((c) => CITIES[c]),
    [infectionDeck.discard],
  );

  const [city, setCity] = useState(citiesArray[0].key);

  const onConfirm = useCallback(() => {
    resilientPopulation(city);
    closeModal();
  }, [city, closeModal, resilientPopulation]);

  return (
    <ConfirmModal
      clickOutside={closeModal}
      closeModal={closeModal}
      onConfirm={onConfirm}
    >
      <Typography appearance="h2">Resilient Population</Typography>
      <p className="mt-2">
        Make sure that{' '}
        <Select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={citiesArray.map((cityObj) => ({
            value: cityObj.key,
            label: cityObj.name,
          }))}
        />{' '}
        never experiences another infection
      </p>
    </ConfirmModal>
  );
};

export default ResilientPopulation;
