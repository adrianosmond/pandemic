import { useCallback, useMemo, useState } from 'react';
import { useGame } from 'contexts/game';
import useMethods from 'hooks/useMethods';
import { ConfirmModal } from 'components/Modal';
import Select from 'components/Select';
import Typography from 'components/Typography';

const GovernmentGrant = ({ closeModal }) => {
  const {
    game: { cities },
  } = useGame();
  const { governmentGrant } = useMethods();
  const citiesArray = useMemo(
    () =>
      Object.values(cities)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .filter((c) => c.researchCenter === false),
    [cities],
  );

  const [city, setCity] = useState(citiesArray[0].key);

  const onConfirm = useCallback(() => {
    governmentGrant(city);
    closeModal();
  }, [city, closeModal, governmentGrant]);

  return (
    <ConfirmModal
      clickOutside={closeModal}
      closeModal={closeModal}
      onConfirm={onConfirm}
    >
      <Typography appearance="h2">Government Grant</Typography>
      <p className="mt-2">
        Build a research center in{' '}
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

export default GovernmentGrant;
