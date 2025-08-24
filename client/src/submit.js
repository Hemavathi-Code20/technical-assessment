import { useCallback } from "react";
import { useStore } from "./store";
import "./styles/nodes.css"; 

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const onSubmit = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) throw new Error(`Backend error ${res.status}`);

      const data = await res.json();
      alert(
        `✅ Submission Successful!\n\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${
          data.is_dag ? "True" : "False"
        }`
      );
    } catch (e) {
      alert(`❌ Submit failed: ${e.message}`);
    }
  }, [nodes, edges]);

  return (
    <div className="vs-submit-container">
      <button onClick={onSubmit} type="button" className="vs-submit-btn">
        🚀 Submit Pipeline
      </button>
    </div>
  );
};
