from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# ✅ Allow frontend (React at :3000) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Data Models --------
class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[dict]
    edges: List[Edge]

# -------- Routes --------
@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Build adjacency list
    adj = {node["id"]: [] for node in pipeline.nodes}
    for edge in pipeline.edges:
        adj[edge.source].append(edge.target)

    # DAG check with DFS
    visited = set()
    rec_stack = set()

    def is_cyclic(v):
        if v not in visited:
            visited.add(v)
            rec_stack.add(v)
            for neigh in adj.get(v, []):
                if neigh not in visited and is_cyclic(neigh):
                    return True
                elif neigh in rec_stack:
                    return True
        rec_stack.discard(v)
        return False

    is_dag = True
    for node in adj:
        if is_cyclic(node):
            is_dag = False
            break

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
