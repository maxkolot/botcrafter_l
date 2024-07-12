import React, { useState } from "react";
// import axios from "axios";

const TokenInput = ({ onTokenValid }) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setToken(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (token) {
        onTokenValid();
      }
      //   const response = await axios.post("http://localhost:5000/tokenCheck", { token });
      //   if (response.data.valid) {
      //     onTokenValid();
      //   } else {
      //     setError("Invalid token format.");
      //   }
    } catch (err) {
      setError("Error checking token.");
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", textAlign: "center" }}>
      <div className="modal-content2">
        <h2>ENTER TOKEN</h2>
        <p>
Для этого:<br></br>
1. Открой отца ботов - @BotFather <br></br>

2. Создай нового бота<br></br>(команда /newbot)<br></br>

3. Отец отправит тебе API token твоего бота (формата 123456789:ASDFABC-DEF1234gh***)<br></br>скопируй этот токен и отправь его мне.<br></br><br></br>

Важно! Не используй бота, которого ты привязывал к другому сервису (или к другим ботам)!
        </p>
        <div style={{ display: "grid" }}>

          <a className="btn-go" target="_blank"  rel="noopener noreferrer"style={{textDecoration:"none"}} href="https://t.me/BotFather">OPEN BOTFATHER</a>
        </div>
      </div>
      <div className="modal-content1">
        <h2>ENTER TOKEN</h2>
        <div style={{ display: "grid" }}>
          <input
            type="text"
            value={token}
            onChange={handleInputChange}
            id="token-input"
            name="token"
          />
          <button className="btn-go" onClick={handleSubmit}>GO</button>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TokenInput;
