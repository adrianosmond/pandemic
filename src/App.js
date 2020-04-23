import React from 'react';
import { Canvas } from 'react-three-fiber';
import { CitiesContext } from 'contexts/cities';
import useCities from 'hooks/useCities';

import Cities from 'components/Cities';
import Content from 'components/Content';
import Controls from 'components/Controls';

const App = () => {
  const cityContextValue = useCities();

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <CitiesContext.Provider value={cityContextValue}>
          <Controls />
          <Content cityContextValue={cityContextValue} />
        </CitiesContext.Provider>
      </Canvas>
      <CitiesContext.Provider value={cityContextValue}>
        <Cities />
      </CitiesContext.Provider>
    </>
  );
};

export default App;
