// /frontend/src/nodes/textNode.js
import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import "../styles/nodes.css"; // ✅ reuse the unified styles

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);

  // Detect variables in {{varName}} format
  const extractVariables = (input) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    let match;
    const found = [];
    while ((match = regex.exec(input)) !== null) {
      found.push(match[1]); // only var name
    }
    return Array.from(new Set(found)); // unique vars
  };

  useEffect(() => {
    const vars = extractVariables(text);
    setVariables(vars);
  }, [text]);

  // Auto-resize textarea
  const handleChange = (e) => {
    const el = e.target;
    setText(el.value);

    // Auto height adjust
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";

    // Auto width adjust (up to a max)
    el.style.width = "auto";
    el.style.width = Math.min(Math.max(150, el.scrollWidth), 400) + "px";
  };

  return (
    <div className="vs-node">
      <div className="vs-node-header">
        <span className="vs-node-title">📝 Text Node</span>
        <span className="vs-node-subtitle">dynamic input</span>
      </div>

      <div className="vs-node-body">
        {/* Text Input */}
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Type something... (use {{var}} for variables)"
          className="vs-input"
          style={{
            resize: "none",
            overflow: "hidden",
            minHeight: "40px",
          }}
        />
      </div>

      {/* Handles for variables */}
      {variables.map((v, idx) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{
            top: 40 + idx * 20,
            background: "#2563eb", // blue to match theme
            border: "2px solid white",
            width: "10px",
            height: "10px",
          }}
        />
      ))}

      {/* Default output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-out`}
        style={{
          background: "#10b981", // green to indicate output
          border: "2px solid white",
          width: "10px",
          height: "10px",
        }}
      />
    </div>
  );
};
