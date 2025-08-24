import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='http' label='HTTP' />
        <DraggableNode type='map' label='Map' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='delay' label='Delay' />
        <DraggableNode type='join' label='Join' />
      </div>
    </div>
  );
};
