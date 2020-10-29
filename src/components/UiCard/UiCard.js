import classnames from 'classnames';

const UiCard = ({ children, className }) => (
  <div
    className={classnames(
      'border border-white border-opacity-25 bg-black bg-opacity-75 m-8 p-4 overflow-y-scroll pointer-events-auto',
      className,
    )}
    style={{ width: 'min(400px, calc(100vw - 4rem))' }}
  >
    {children}
  </div>
);

export default UiCard;
