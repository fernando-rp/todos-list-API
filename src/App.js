import './App.css';
import AddTask from "./components/add_task"

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto p-4 " id="todo">todos</div>
      </div>

      <AddTask/>
     
    </div>
  );
}

export default App;
