import React from 'react';
import { Canvas } from 'react-three-fiber';
import { CitiesContext } from 'contexts/cities';
import useGameState from 'hooks/useGameState';

import Cities from 'components/Cities';
import Content from 'components/Content';
import Controls from 'components/Controls';

const App = () => {
  const gameState = useGameState();

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 2] }}
        invalidateFrameloop={gameState.pauseRendering}
      >
        <CitiesContext.Provider value={gameState}>
          <Controls />
          <Content />
        </CitiesContext.Provider>
      </Canvas>
      <CitiesContext.Provider value={gameState}>
        <Cities />
      </CitiesContext.Provider>
    </>
  );
};

export default App;
