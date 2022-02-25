import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { connect } from "react-redux";
// const getLocalStorage = () => {
//   let list = localStorage.getItem("list");
//   if (list) {
//     return JSON.parse(localStorage.getItem("list"));
//   } else return [];
// };

function App({ dispatch, searchedList, editName, list }) {
  // useStates
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  // useRef
  const searchValue = React.useRef("");
  // main functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      dispatch({ type: "END_EDIT", payload: name });
      setName("");
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      dispatch({ type: "ADD_TASK", payload: name });
      showAlert(true, "success", "item added to the list");
      setName("");
    }
  };
  // alert function
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  // basic functions
  const searchTasks = () => {
    dispatch({ type: "SEARCH_TASK", payload: searchValue.current.value });
  };

  const clearlist = () => {
    showAlert(true, "danger", "Empty List");
    dispatch({ type: "CLEAR_LIST" });
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    dispatch({ type: "REMOVE_TASK", payload: id });
  };
  const editItem = (id) => {
    dispatch({ type: "EDIT_TASK", payload: id });
    setIsEditing(true);
    setName(editName);
  };
  // useEffect(() => {
  //   localStorage.setItem("list", JSON.stringify(list));
  // }, [list]);

  return (
    <section className="section-center">
      <form className="task-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h3>task manager app</h3>
        <p>Add task</p>
        <div className="form-control">
          <input
            type="text"
            className="task"
            placeholder="homework"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      <form className="task-form" onSubmit={handleSubmit}>
        <p>Search task</p>
        <div className="form-control">
          <input
            type="text"
            className="task"
            placeholder="task name"
            ref={searchValue}
            onChange={searchTasks}
          />
        </div>
      </form>

      {list.length > 0 && (
        <div className="task-container">
          <List removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearlist}>
            clear Tasks
          </button>
        </div>
      )}
    </section>
  );
}
function mapStateToProps(state) {
  const { list, searchedList, searchTerm, editName } = state;

  return { list, searchedList, searchTerm, editName };
}
export default connect(mapStateToProps)(App);
