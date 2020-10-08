import React from 'react';
import classnames from 'classnames';

const PlayerToken = ({ role, size = 'normal', className }) => (
  <div
    className={classnames(
      'rounded-full bg-cover',
      {
        'border-contingency-planner bg-contingency-planner':
          role === 'contingency-planner',
        'border-dispatcher bg-dispatcher': role === 'dispatcher',
        'border-medic bg-medic': role === 'medic',
        'border-operations-expert bg-operations-expert':
          role === 'operations-expert',
        'border-quarantine-specialist bg-quarantine-specialist':
          role === 'quarantine-specialist',
        'border-researcher bg-researcher': role === 'researcher',
        'border-scientist bg-scientist': role === 'scientist',
        'w-3 h-3 border border-black border-opacity-25': size === 'small',
        'w-8 h-8 border-2': size === 'medium',
        'w-12 h-12 border-2': size === 'normal',
      },
      className,
    )}
    style={size === 'small' ? {} : { backgroundImage: `url(/${role}.jpg)` }}
  ></div>
);

export default PlayerToken;
