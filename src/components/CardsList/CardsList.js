import { CITIES, EVENTS } from 'data/gameData';
import Card from 'components/Card/Card';

const CardsList = ({ cards, share, discard, onClick }) => (
  <>
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
          share={share}
          discard={discard}
          onClick={onClick}
        />
      ))}
  </>
);

export default CardsList;
