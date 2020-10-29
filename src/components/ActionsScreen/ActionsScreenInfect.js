import Button from 'components/Button';
import Typography from 'components/Typography';
import CardsList from 'components/CardsList';

const ActionsScreenEpidemic = ({ isQuietNight, cards, endTurn }) => (
  <div>
    <Typography as="h2" appearance="h2">
      Infected cities
    </Typography>
    <div className="my-8">
      {isQuietNight ? (
        <p>Quiet night - no cities infected</p>
      ) : (
        <CardsList cards={cards} />
      )}
    </div>
    <Button onClick={endTurn}>End turn</Button>
  </div>
);

export default ActionsScreenEpidemic;
