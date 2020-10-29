import { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { WorldContext } from 'contexts/world';
import { GameContext } from 'contexts/game';
import { UiContext } from 'contexts/ui';
import useWorldState from 'hooks/useWorldState';
import useGameState from 'hooks/useGameState';
import useUiState from 'hooks/useUiState';

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
  const uiState = useUiState();
  const citiesRef = useRef();

  return (
    <>
      <Canvas
        camera={{ position: cameraStart }}
        invalidateFrameloop={worldState.pauseRendering}
      >
        <WorldContext.Provider value={worldState}>
          <GameContext.Provider value={gameState}>
            <UiContext.Provider value={uiState}>
              {citiesRef.current && <Controls domEl={citiesRef.current} />}
              <Content />
            </UiContext.Provider>
          </GameContext.Provider>
        </WorldContext.Provider>
      </Canvas>
      <WorldContext.Provider value={worldState}>
        <GameContext.Provider value={gameState}>
          <UiContext.Provider value={uiState}>
            <Cities ref={citiesRef} />
            <Interface />
          </UiContext.Provider>
        </GameContext.Provider>
      </WorldContext.Provider>
    </>
  );
};

export default App;
