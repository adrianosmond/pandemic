import classnames from 'classnames';
import { sortDiseaseAmounts } from 'utils/utils';
import PlayerToken from 'components/PlayerToken';

const City = ({
  name,
  zIndex,
  transform,
  opacity,
  color,
  black,
  blue,
  red,
  yellow,
  researchCenter,
  isQuarantined,
  players,
  selectCity,
}) => {
  const infectionRows = sortDiseaseAmounts({ color, black, blue, red, yellow });
  return (
    <div
      className={classnames(
        'text-white absolute left-0 top-0 py-1 px-2 0.5rem opacity-0 rounded text-center bg-black bg-opacity-75 cursor-pointer',
        {
          'text-disease-black': color === black,
          'text-disease-blue': color === blue,
          'text-disease-red': color === red,
          'text-disease-yellow': color === yellow,
          'background-color: rgba(0, 50, 0, 0.65);border: 1px solid green;': isQuarantined,
        },
      )}
      style={
        opacity > 0
          ? { zIndex, transform, opacity }
          : { opacity: 0, pointerEvents: 'none' }
      }
      onPointerUp={selectCity}
    >
      {name}
      {infectionRows.map(([col, count], index) => (
        <div className="mt-2 flex justify-center" key={index}>
          <div
            className={classnames('h-1 w-3 rounded opacity-25', {
              'bg-disease-black': col === 'black',
              'bg-disease-blue': col === 'blue',
              'bg-disease-red': col === 'red',
              'bg-disease-yellow': col === 'yellow',
              'opacity-100': count > 0,
            })}
          ></div>
          <div
            className={classnames('h-1 w-3 rounded ml-1 opacity-25', {
              'bg-disease-black': col === 'black',
              'bg-disease-blue': col === 'blue',
              'bg-disease-red': col === 'red',
              'bg-disease-yellow': col === 'yellow',
              'opacity-100': count > 1,
            })}
          ></div>
          <div
            className={classnames('h-1 w-3 rounded ml-1 opacity-25', {
              'bg-disease-black': col === 'black',
              'bg-disease-blue': col === 'blue',
              'bg-disease-red': col === 'red',
              'bg-disease-yellow': col === 'yellow',
              'opacity-100': count > 2,
            })}
          ></div>
        </div>
      ))}
      <div className="flex absolute left-0 top-0 -mt-3">
        {players.map(({ role }, index) => (
          <PlayerToken key={index} role={role} size="small" className="-ml-1" />
        ))}
      </div>
      {researchCenter && (
        <svg
          className="w-3 h-3 absolute top-0 -mt-3 -mb-px right-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M3 22L3 10l8-8 8 8v10H3z" fill="#fff" />
        </svg>
      )}
    </div>
  );
};

export default City;
