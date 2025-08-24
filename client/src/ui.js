import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import GenericNode from './nodes/GenericNode';
import { TextNode } from './nodes/textNode';
import { nodePresets } from './nodes/presets';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: GenericNode,
  llm: GenericNode,
  customOutput: GenericNode,
  http: GenericNode,
  map: GenericNode,
  filter: GenericNode,
  delay: GenericNode,
  join: GenericNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
    ...(nodePresets[type]?.seed || {}),
  });

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    if (!event?.dataTransfer?.getData('application/reactflow')) return;

    const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    const type = appData?.nodeType;
    if (!type) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const nodeID = getNodeID(type);
    addNode({
      id: nodeID,
      type,
      position,
      data: getInitNodeData(nodeID, type),
    });
  }, [reactFlowInstance, getNodeID, addNode]); // ✅ added missing dependencies

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
