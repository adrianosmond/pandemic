import React from 'react';
import { CITIES, EVENTS } from 'data/gameData';
import Button from 'components/Button';
import Card from 'components/Card';
import Typography from 'components/Typography';

const ActionsScreenCards = ({ cards, pickUpPlayerCards }) => {
  return (
    <div>
      <Typography as="h2" appearance="h2">
        New player cards
      </Typography>
      <div className="my-8">
        {cards
          .map((card) => ({
            ...(CITIES[card] ||
              EVENTS[card] || { name: 'epidemic', color: 'epidemic' }),
          }))
          .map((card, index) => (
            <Card
              key={index}
              title={card.name}
              description={card.description}
              cardStyle={card.color || 'event'}
            />
          ))}
      </div>
      <Button className="mt-2" onClick={pickUpPlayerCards}>
        Continue
      </Button>
    </div>
  );
};

export default ActionsScreenCards;
