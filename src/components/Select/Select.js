import classnames from 'classnames';

const Select = ({ value, options, onChange, defaultOption, className }) => (
  <select
    value={value}
    onChange={onChange}
    className={classnames('bg-white text-black font-bold', className)}
  >
    {defaultOption && (
      <option value="" key="default">
        {defaultOption}
      </option>
    )}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
