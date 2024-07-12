import React from 'react';
import { getBezierPath } from 'react-flow-renderer';

const CustomConnectionLine = ({ fromX, fromY, toX, toY }) => {
  const edgePath = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    sourcePosition: 'right',
    targetPosition: 'left',
  });

  return (
    <path
      className="react-flow__connection-path"
      d={edgePath}
      stroke="red"
      strokeWidth={2}
      strokeDasharray="5,5"
    />
  );
};

export default CustomConnectionLine;
