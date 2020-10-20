import React from 'react';
import { CITIES } from 'data/gameData';
import Button from 'components/Button';
import Typography from 'components/Typography';
import Card from 'components/Card';

const ActionsScreenEpidemic = ({ cards, endTurn }) => (
  <div>
    <Typography as="h2" appearance="h2">
      Infected cities
    </Typography>
    <div className="my-8">
      {cards
        .map((card) => ({
          ...CITIES[card],
        }))
        .map((card, index) => (
          <Card
            key={index}
            title={card.name}
            description={card.description}
            cardStyle={card.color}
          />
        ))}
    </div>
    <Button onClick={endTurn}>End turn</Button>
  </div>
);

export default ActionsScreenEpidemic;
