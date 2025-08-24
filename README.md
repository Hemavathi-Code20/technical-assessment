# Technical Assessment – React + FastAPI

This project has two parts:  
- **Frontend** → React app with draggable nodes  
- **Backend** → FastAPI server that checks if the pipeline is a DAG  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <technical_assessment>
cd <client>

```

### 2. Run the Frontend (React)
```bash
cd client
npm install
npm start

```
#### The app will run at: http://localhost:3000

### Run the Backend (FastAPI)
```bash
cd server
uvicorn main:app --reload

```
#### The backend will run at: http://localhost:8000

## ✅ How to Use

 Open http://localhost:3000
 Drag and drop nodes to build a pipeline
 Click Submit
 An alert will show:
 Number of nodes
 Number of edges
 Whether the pipeline is a DAG


