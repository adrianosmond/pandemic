import React from 'react';
import classes from './Card.module.css';

const Card = ({ title, description, cardStyle, share, discard }) => (
  <div className={[classes.card, classes[cardStyle]].join(' ')}>
    <div className={classes.heading}>
      <div className={classes.title}>{title}</div>

      {share && (
        <button className={classes.discard} onClick={share}>
          S
        </button>
      )}
      <button className={classes.discard} onClick={discard}>
        &times;
      </button>
    </div>
    {description && <div className={classes.description}>{description}</div>}
  </div>
);

export default Card;
