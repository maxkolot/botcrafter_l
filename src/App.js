import React, { useState } from "react";
import { ReactFlowProvider } from 'react-flow-renderer';
import TokenValidationScreen from "./components/TokenValidationScreen";
import MainScreen from "./components/MainScreen";

const App = () => {
  const [tokenValid, setTokenValid] = useState(false);

  return (
    <div >
      {tokenValid ? (
        <ReactFlowProvider >
          <MainScreen />
        </ReactFlowProvider>
      ) : (
        <TokenValidationScreen onTokenValid={() => setTokenValid(true)} />
      )}
    </div>
  );
};

export default App;
 