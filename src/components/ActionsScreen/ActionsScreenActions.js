import Button from 'components/Button';
import Typography from 'components/Typography';

const ActionsScreenActions = ({ actions, skipActions }) => (
  <div>
    <Typography as="h2" appearance="h2">
      Actions
    </Typography>
    {actions.length === 0 ? (
      <p>No actions taken</p>
    ) : (
      <ol className="list-decimal pl-6">
        {actions.map((action, index) =>
          action ? <li key={index}>{action}</li> : null,
        )}
      </ol>
    )}
    {actions.length < 4 && (
      <p className="my-2">
        If you want to skip your remaining actions, click on Draw cards
      </p>
    )}
    <Button className="mt-2" onClick={skipActions}>
      Draw cards
    </Button>
  </div>
);

export default ActionsScreenActions;
