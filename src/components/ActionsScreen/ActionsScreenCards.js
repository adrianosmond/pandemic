import Button from 'components/Button';
import CardsList from 'components/CardsList';
import Typography from 'components/Typography';

const ActionsScreenCards = ({ cards, pickUpPlayerCards }) => {
  return (
    <div>
      <Typography as="h2" appearance="h2">
        New player cards
      </Typography>
      <div className="my-8">
        <CardsList cards={cards} />
      </div>
      <Button className="mt-2" onClick={pickUpPlayerCards}>
        Continue
      </Button>
    </div>
  );
};

export default ActionsScreenCards;
