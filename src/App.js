import React from 'react';
import { Canvas } from 'react-three-fiber';
import { WorldContext } from 'contexts/world';
import { GameContext } from 'contexts/game';
import useWorldState from 'hooks/useWorldState';
import useGameState from 'hooks/useGameState';

import Cities from 'components/Cities';
import Content from 'components/Content';
import Controls from 'components/Controls';
import Interface from 'components/Interface';

const cameraStart = [
  0.057865988059268056,
  1.1183858069414931,
  1.6570650905313735,
]; // over Atlanta

const App = () => {
  const worldState = useWorldState();
  const gameState = useGameState();

  return (
    <>
      <Canvas
        camera={{ position: cameraStart }}
        invalidateFrameloop={worldState.pauseRendering}
      >
        <WorldContext.Provider value={worldState}>
          <GameContext.Provider value={gameState}>
            <Controls />
            <Content />
          </GameContext.Provider>
        </WorldContext.Provider>
      </Canvas>
      <WorldContext.Provider value={worldState}>
        <GameContext.Provider value={gameState}>
          <Cities />
          <Interface />
        </GameContext.Provider>
      </WorldContext.Provider>
    </>
  );
};

export default App;
