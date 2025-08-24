// draggableNode.js
import "./styles/nodes.css";

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`vs-draggable ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
