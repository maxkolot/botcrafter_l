import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  Controls,
  ReactFlowProvider,
  useStoreApi,
  Position,
} from 'react-flow-renderer';
import NodeMenu from './NodeMenu';
import CustomNode from './CustomNode';
import FloatingEdge from './FloatingEdge';
import CustomConnectionLine from './CustomConnectionLine';
import './style.css';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 5 },
    data: { label: 'Сообщение' },
  },
];

const initialEdges = [];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
};

const MIN_DISTANCE = 150;

const MainScreen = () => {
  const store = useStoreApi();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useRef(null);
  const[ vie, setVie] =useState(false);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'floating' }, eds)),
    [setEdges]
  );

  const onConnectEnd = (event) => {
    const targetIsPane = event.target.classList.contains('react-flow__pane');
    if (targetIsPane) {
      const { clientX: x, clientY: y } = event;
      setMenuPosition({ x, y });
      setMenuVisible(true);
      setVie(true);
      console.log("Отпустили связь, отображаем меню");
    }
  };

  const getClosestEdge = useCallback((node) => {
    const { nodeInternals } = store.getState();
    const internalNode = nodeInternals.get(node.id);

    const closestNode = Array.from(nodeInternals.values()).reduce(
      (res, n) => {
        if (n.id !== internalNode.id) {
          const dx = n.positionAbsolute.x - internalNode.positionAbsolute.x;
          const dy = n.positionAbsolute.y - internalNode.positionAbsolute.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < res.distance && d < MIN_DISTANCE) {
            res.distance = d;
            res.node = n;
          }
        }

        return res;
      },
      {
        distance: Number.MAX_VALUE,
        node: null,
      },
    );

    if (!closestNode.node) {
      return null;
    }

    const closeNodeIsSource =
      closestNode.node.positionAbsolute.x < internalNode.positionAbsolute.x;

    return {
      id: closeNodeIsSource
        ? `${closestNode.node.id}-${node.id}`
        : `${node.id}-${closestNode.node.id}`,
      source: closeNodeIsSource ? closestNode.node.id : node.id,
      target: closeNodeIsSource ? node.id : closestNode.node.id,
    };
  }, [store]);

  const onNodeDrag = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp');

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        ) {
          closeEdge.className = 'temp';
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge, setEdges]
  );

  const onNodeDragStop = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp');

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        ) {
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getClosestEdge, setEdges]
  );

  const showMenu = (event) => {
    event.preventDefault();
    console.log("Правый клик, отображаем меню");
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setMenuVisible(true);
  };

  const hideMenu = () => {
    console.log("Скрываем меню");
    setMenuVisible(false);
  };

  const addNode = (type) => {
    if (reactFlowInstance.current) {
      const { project } = reactFlowInstance.current;

      const newNode = {
        id: (nodes.length + 1).toString(),
        type: 'custom',
        position: project({
          x: menuPosition.x - reactFlowWrapper.current.getBoundingClientRect().left,
          y: menuPosition.y - reactFlowWrapper.current.getBoundingClientRect().top,
        }),
        data: { label: type },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
      setNodes((nds) => nds.concat(newNode));
      hideMenu(); // Hide menu after adding node
    }
  };

  const deleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    },
    [setNodes, setEdges]
  );

  const deleteEdge = useCallback(
    (edgeId) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    },
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({
    custom: (props) => <CustomNode {...props} deleteNode={deleteNode} />,
  }), [deleteNode]);

  const edgeTypes = useMemo(() => ({
    floating: (props) => <FloatingEdge {...props} data={{ onRemove: deleteEdge }} />,
  }), [deleteEdge]);

  const onInit = (instance) => {
    reactFlowInstance.current = instance;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Клик за пределами меню, кнопка:", event.button);
      // Проверка на левую кнопку мыши
      if (event.button !== 0) return;
      console.log("Клик левой кнопкой мыши, проверка видимости меню");
      if (menuVisible && !event.target.closest('.node-menu')) {
        console.log("Клик вне меню, скрываем меню");
        hideMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    console.log("Добавлен обработчик mousedown");
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      console.log("Удален обработчик mousedown");
    };
  }, [menuVisible]);

  const handleClick = (event) => {
    if (event.button === 0) { // 0 is the left mouse button
      console.log("Левая кнопка мыши нажата по div");
      
      if (menuVisible && !event.target.closest('.node-menu')) {
        console.log("Клик вне меню, скрываем меню");
        if (vie === false) {console.log("Клик вне меню, скрываем меню и не после обрыва связи"); hideMenu();}
        else { setVie(false);}
      }
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgb(229 229 229)',
        overflow: 'hidden',
        willChange: 'transform',
      }}
      onContextMenu={showMenu}
      onClick={handleClick}
    >
      <div
        ref={reactFlowWrapper}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <ReactFlow
          attributionPosition="none"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onInit={onInit}
          fitView
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={connectionLineStyle}
          connectionLineComponent={CustomConnectionLine}
          zoomOnScroll={true}
          minZoom={0.5}
          maxZoom={2}
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Controls />
        </ReactFlow>
      </div>
      {menuVisible && <NodeMenu position={menuPosition} onSelect={addNode} />}
    </div>
  );
};

const MainScreenWrapper = () => (
  <ReactFlowProvider>
    <MainScreen />
  </ReactFlowProvider>
);

export default MainScreenWrapper;
