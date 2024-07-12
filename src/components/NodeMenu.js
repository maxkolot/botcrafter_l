import React from 'react';

const NodeMenu = ({ position, onSelect }) => {
  const menuItems = [
    'Сообщение',
    'Условие',
    'Получение текста',
    'Получение медиа',
    'Запросить геолокацию',
    'Запросить контакт',
  ];
  return (
    <div
      className="node-menu"
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      {menuItems.map((item) => (
        <div
          key={item}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderBottom: '1px solid #eee',
          }}
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default NodeMenu;
