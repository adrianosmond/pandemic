import classnames from 'classnames';

const Button = ({ className, onClick, disabled, children }) => (
  <button
    className={classnames(
      'p-2 border-0 rounded font-semibold text-black whitespace-no-wrap bg-gradient-to-tr from-disease-yellow to-disease-blue focus:outline-none',
      className,
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
