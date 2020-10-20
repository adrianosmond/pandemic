import React from 'react';
import Typography from 'components/Typography';
import Button from 'components/Button';

const ActionsScreenEpidemic = ({
  infectionRate,
  lastInfected,
  endEpidemic,
}) => (
  <div>
    <Typography as="h2" appearance="h2">
      Epidemic
    </Typography>
    <p>The epidemic was centred on {lastInfected}</p>
    <p>The infection rate is at {infectionRate}</p>
    <Button className="mt-2" onClick={endEpidemic}>
      Continue
    </Button>
  </div>
);

export default ActionsScreenEpidemic;
