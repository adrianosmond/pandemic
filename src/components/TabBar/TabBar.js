import React from 'react';
import classnames from 'classnames';

const TabBar = ({ visibleTab, showTab }) => (
  <div className="absolute bottom-0 w-full flex justify-center flex-shrink-0 pointer-events-none">
    <button
      className={classnames(
        'h-12 w-12 p-2 border border-disease-black bg-black focus:outline-none pointer-events-auto',
        { 'bg-grey-700': visibleTab === 'progress' },
      )}
      onClick={() => showTab('progress')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path d="M19 5h-2V3H7v2H5a2 2 0 00-2 2v1a5 5 0 004.4 5 5 5 0 003.6 2.9V19H7v2h10v-2h-4v-3.1a5 5 0 003.6-3A5 5 0 0021 8V7a2 2 0 00-2-2zM7 10.8A3 3 0 015 8V7h2v3.8zM19 8a3 3 0 01-2 2.8V7h2v1z" />
      </svg>
    </button>
    <button
      className={classnames(
        'h-12 w-12 p-2 border border-disease-black bg-black focus:outline-none pointer-events-auto',
        { 'bg-grey-700': visibleTab === 'players' },
      )}
      onClick={() => showTab('players')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path
          d="M16.7 13.1c1.3 1 2.3 2.2 2.3 3.9v3h4v-3c0-2.2-3.6-3.5-6.3-3.9z"
          fillRule="evenodd"
        />
        <circle cx="9" cy="8" fillRule="evenodd" r="4" />
        <path
          d="M15 12a4 4 0 10-1.3-7.8 6 6 0 010 7.6l1.3.2z"
          fillRule="evenodd"
        />
        <path
          d="M9 13c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4z"
          fillRule="evenodd"
        />
      </svg>
    </button>
    <button
      className={classnames(
        'h-12 w-12 p-2 border border-disease-black bg-black focus:outline-none pointer-events-auto',
        { 'bg-grey-700': visibleTab === 'cities' },
      )}
      onClick={() => showTab('cities')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
      </svg>
    </button>
    <button
      className={classnames(
        'h-12 w-12 p-2 border border-disease-black bg-black focus:outline-none pointer-events-auto',
        { 'bg-grey-700': visibleTab === 'actions' },
      )}
      onClick={() => showTab('actions')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path d="M19 3h-4.2A3 3 0 0012 1a3 3 0 00-2.8 2H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 0c.6 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm-2 14l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z" />
      </svg>
    </button>
  </div>
);

export default TabBar;
