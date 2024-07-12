import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import ButtonTypeModal from './ButtonTypeModal';
import ButtonNameModal from './ButtonNameModal';

const CustomNode = ({ id, data, deleteNode }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [showButtonOptions, setShowButtonOptions] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [currentButtonIndex, setCurrentButtonIndex] = useState(null);

  const onMouseEnter = () => setShowDelete(true);
  const onMouseLeave = () => setShowDelete(false);

  const addButton = (type) => {
    const newButton = {
      id: buttons.length + 1,
      type,
      label: 'Введите название',
    };
    setButtons([...buttons, newButton]);
    setShowButtonOptions(false);
  };

  const editButtonLabel = (index) => {
    setCurrentButtonIndex(index);
    setShowNameModal(true);
  };

  const saveButtonLabel = (name) => {
    const updatedButtons = buttons.slice();
    updatedButtons[currentButtonIndex].label = name;
    setButtons(updatedButtons);
    setCurrentButtonIndex(null);
  };

  return (
    <div
      style={{
        position: 'relative',
        backdropFilter: 'blur(1px)',
        backgroundColor: '#ffffff5c',
        padding: 10,
        border: '1px solid #ddd',
        borderRadius: 5,
        width: 200,
        willChange: 'transform',
      }}
      id='modal'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showDelete && (
        // <div
        //   style={{
        //     position: 'absolute',
        //     top: -10,
        //     right: -10,
        //     width: 24,
        //     height: 24,
        //     background: 'red',
        //     color: 'white',
        //     borderRadius: '50%',
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     cursor: 'pointer',
        //     fontSize: 16,
        //   }}
          
        // >
        <span className="close1" onClick={() => deleteNode(id)}>&times;</span>
        // </div>
      )}
      <div>{data.label}</div>
      <textarea
        placeholder="Введите ваше сообщение"
        style={{
          width: '100%',
          height: '40px',
          margin: '10px 0',
          resize: 'none',
        }}
      />
      {buttons.map((button, index) => (
        <button
          key={button.id}
          onDoubleClick={() => editButtonLabel(index)}
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '10px',
          }}
        >
          {button.label}
        </button>
      ))}
      {showButtonOptions ? (
        <ButtonTypeModal
          onClose={() => setShowButtonOptions(false)}
          onSelect={addButton}
        />
      ) : (
        <button
          onClick={() => setShowButtonOptions(true)}
          style={{
            display: 'block',
            width: '100%',
          }}
        >
          Добавить кнопку
        </button>
      )}
      {showNameModal && (
        <ButtonNameModal
          onClose={() => setShowNameModal(false)}
          onSave={saveButtonLabel}
        />
      )}
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: "40px", background: '#555' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ top:"40px", background: '#888' }} 
      />
    </div>
  );
};

export default CustomNode;