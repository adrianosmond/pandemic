import React from 'react';
import classnames from 'classnames';

const Card = ({ title, description, cardStyle, share, discard }) => (
  <div
    className={classnames(
      'p-2 pb-4 border-2 border-white border-b-0 rounded-t-lg text-black -mt-2 last:pb-3 shadow-card',
      {
        'bg-disease-black': cardStyle === 'black',
        'bg-disease-blue': cardStyle === 'blue',
        'bg-disease-red': cardStyle === 'red',
        'bg-disease-yellow': cardStyle === 'yellow',
        'bg-event': cardStyle === 'event',
        'bg-green-900 text-white': cardStyle === 'epidemic',
      },
    )}
  >
    <div className="flex justify-between items-center">
      <div className="font-bold text-lg uppercase">{title}</div>
      <div className="space-x-2">
        {share && (
          <button className="w-5 h-5" onClick={share}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
            </svg>
          </button>
        )}
        {discard && (
          <button className="w-5 h-5" onClick={discard}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        )}
      </div>
    </div>
    {description && <div className="mt-2">{description}</div>}
  </div>
);

export default Card;
