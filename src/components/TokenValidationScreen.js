// src/components/TokenValidationScreen.js
import React from "react";
import TokenInput from "./TokenInput";

const TokenValidationScreen = ({ onTokenValid }) => {
  return (
    <div className="start" >
      <TokenInput onTokenValid={onTokenValid} />
    </div>
  );
};

export default TokenValidationScreen;
