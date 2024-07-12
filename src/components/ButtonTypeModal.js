import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ButtonTypeModal = ({ onClose, onSelect }) => {
  return ReactDOM.createPortal(
    <div className="modal1">
      <div className="modal-content11">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Выберите тип кнопки</h2>
        <div className="modaldivbutton">
        <button onClick={() => onSelect('link')}>Кнопка ссылка</button>
        <button onClick={() => onSelect('action')}>Кнопка действие</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ButtonTypeModal;
