import React from 'react';
import { getBezierPath } from 'react-flow-renderer';

const FloatingEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd, data }) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition: 'right',
    targetX,
    targetY,
    targetPosition: 'left',
  });

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {/* <span className="close" onClick={() => data.onRemove(id)}>&times;</span> */}
      <g  transform={`translate(${midX},${midY})`} onClick={() => data.onRemove(id)}>
        {/* <circle cx="0" cy="0" r="10" fill="white" stroke="red" strokeWidth="2" /> */}
        <text className='close' color='#333' x="-5" y="5" cursor={'pointer'} fontSize="25"  fontWeight="bold">&times;</text>
      </g>
    </>
  );
};

export default FloatingEdge;
