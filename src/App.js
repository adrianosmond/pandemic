import React from 'react';
import { Canvas } from 'react-three-fiber';
import { GameContext } from 'contexts/game';
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
        <GameContext.Provider value={gameState}>
          <Controls />
          <Content />
        </GameContext.Provider>
      </Canvas>
      <GameContext.Provider value={gameState}>
        <Cities />
      </GameContext.Provider>
    </>
  );
};

export default App;
