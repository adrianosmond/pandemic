import React from 'react';
import classes from './TabBar.module.css';

const TabBar = ({ visibleTab, showTab }) => (
  <div className={classes.tabBar}>
    <button
      className={[
        classes.tabBarButton,
        visibleTab === 'progress' ? classes.selectedTab : '',
      ].join(' ')}
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
      className={[
        classes.tabBarButton,
        visibleTab === 'cards' ? classes.selectedTab : '',
      ].join(' ')}
      onClick={() => showTab('cards')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path d="M2.5 19.6l1.4.6v-9L1.4 17a2 2 0 001.1 2.6zM22 16L17 4a2 2 0 00-2.5-1L7 5.9a2 2 0 00-1 2.7l4.9 12a2 2 0 002.6 1l7.3-3A2 2 0 0022 16zM8 8.8c-.6 0-1-.4-1-1s.4-1 1-1 1 .5 1 1-.5 1-1 1zm-2 11c0 1.2.9 2 2 2h1.4L6 13.4v6.3z" />
      </svg>
    </button>
    <button
      className={[
        classes.tabBarButton,
        visibleTab === 'cities' ? classes.selectedTab : '',
      ].join(' ')}
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
      className={[
        classes.tabBarButton,
        visibleTab === 'actions' ? classes.selectedTab : '',
      ].join(' ')}
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
