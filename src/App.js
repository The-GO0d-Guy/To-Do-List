import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import AddTaskForm from "./components/addTaskForm";


function App() {
  const [toDo, setToDo] = useState([
    { id: 2, title: "Task 2", Status: false },
    { id: 1, title: "Task 1", Status: false },
    { id: 3, title: "Task 3", Status: false },
    { id: 4, title: "Task 4", Status: false },
  ]);

  //Temporary State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  // Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Mark as completed
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id == id) {
        return { ...task, Status: !task.Status };
      }
      return task;
    });
    setToDo(newTask);
  };

  // Cancel Update
  const cancelUpdate = () => {
    setUpdateData();
  };

  //Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      Status: updateData.Status ? true : false,
    };
    setUpdateData(newEntry);
  };

  //Update task for update
  const updateTask = (e) => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
  };

  const cancel = (e) => {
    setUpdateData("");
  }

  return (
    <div className="container App">
      <br />
      <br />
      <h2>To-Do List App for GDSC</h2>
      <br />
      <br />

      {/* Update Task */}
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={updateTask}
                className="btn btn-lg btn-success mr-20"
              >
                Update
              </button>
              <button 
              onClick={cancel}
              className="btn btn-lg btn-warning">Cancel</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <AddTaskForm>
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        </AddTaskForm>
      )}

      {/* Display Web Application */}

      {toDo && toDo.length ? "" : "No Tasks..."}

      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.Status ? "done" : ""}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>

                  <div className="iconsWrap">
                    <span
                      onClick={(e) => markDone(task.id)}
                      title="Completed / Not Completed"
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.Status ? null : (
                      <span
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            Status: task.Status ? true : false,
                          })
                        }
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}
                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
