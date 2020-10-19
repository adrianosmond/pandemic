import React from 'react';
import Button from 'components/Button';
import Typography from 'components/Typography';

const ActionsScreenEpidemic = ({ endTurn }) => (
  <div>
    <Typography as="h2" appearance="h2">
      Infect cities
    </Typography>
    <Button onClick={endTurn}>End turn</Button>
  </div>
);

export default ActionsScreenEpidemic;
