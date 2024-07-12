import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ButtonNameModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    onSave(name);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal1">
      <div className="modal-content11">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Введите название кнопки</h2>
        <div className="modal-line" style={{display: "grid"}}>
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSave}>Сохранить</button>
        </div>

        
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ButtonNameModal;
