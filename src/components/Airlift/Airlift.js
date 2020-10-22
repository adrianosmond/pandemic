import React, { useCallback, useMemo, useState } from 'react';
import { CITIES } from 'data/gameData';
import { useGame } from 'contexts/game';
import useMethods from 'hooks/useMethods';
import { ConfirmModal } from 'components/Modal';
import Select from 'components/Select';
import Typography from 'components/Typography';

const Airlift = ({ closeModal }) => {
  const {
    game: { players },
  } = useGame();
  const { airlift } = useMethods();
  const citiesArray = useMemo(
    () => Object.values(CITIES).sort((a, b) => (a.name > b.name ? 1 : -1)),
    [],
  );
  const [player, setPlayer] = useState(players[0].role);
  const [city, setCity] = useState(citiesArray[0].key);

  const onConfirm = useCallback(() => {
    airlift(player, city);
    closeModal();
  }, [airlift, city, closeModal, player]);

  return (
    <ConfirmModal
      clickOutside={closeModal}
      closeModal={closeModal}
      onConfirm={onConfirm}
    >
      <Typography appearance="h2">Airlift</Typography>
      <p className="mt-2">
        Move{' '}
        <Select
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          options={players.map((playerObj) => ({
            value: playerObj.role,
            label: playerObj.name,
          }))}
        />
      </p>
      <p className="mt-2">
        to{' '}
        <Select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={citiesArray.map((cityObj) => ({
            value: cityObj.key,
            label: cityObj.name,
          }))}
        />
      </p>
    </ConfirmModal>
  );
};

export default Airlift;
