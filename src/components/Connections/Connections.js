import React from 'react';
import { CONNECTING_LINES } from 'data/data';
import Curve from 'components/Curve';

const Connections = () => (
  <group>
    {CONNECTING_LINES.map((curve, index) => (
      <Curve curve={curve} key={index} />
    ))}
  </group>
);

export default Connections;
