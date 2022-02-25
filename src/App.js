import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { connect } from "react-redux";
// const getLocalStorage = () => {
//   let list = localStorage.getItem("list");
//   if (list) {
//     return JSON.parse(localStorage.getItem("list"));
//   } else return [];
// };

function App({ dispatch,searchedList }) {
  const [name, setName] = useState("");
  const [list, setList] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const searchValue = React.useRef("");
  const [filteredList, setFilteredList] = useState(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      dispatch({ type: "END_EDIT",payload:name });
      // setList(
      //   list.map((item) => {
      //     if (item.id === editId) {
      //       return { ...item, title: name };
      //       return item;
      //     }
      //   })
      // );
      // setFilteredList(
      //   filteredList.map((item) => {
      //     if (item.id === editId) {
      //       return { ...item, title: name };
      //       return item;
      //     }
      //   })
      // );
      // setEditId(null);
      setName("");
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      dispatch({ type: "ADD_TASK",payload:name });
      showAlert(true, "success", "item added to the list");
      setName("");

      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setFilteredList([...list, newItem]);
    }
  };

  const searchTasks = () => {
    dispatch({ type: "SEARCH_TASK",payload:searchValue.current.value });
    setSearchTerm(searchValue.current.value);
    let newList = list.filter((specificItem) => {
      return specificItem.title
        .toLowerCase()
        .includes(searchValue.current.value);
    });
    setFilteredList(newList);

    if (searchValue.current.value.length < 1) {
      setFilteredList(list);
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearlist = () => {
    showAlert(true, "danger", "Empty List");
    dispatch({ type: "CLEAR_LIST" });
    // setList([]);
    // setFilteredList([])
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    dispatch({ type: "REMOVE_TASK",payload:id })
    // setList(list.filter((item) => item.id !== id));
    // setFilteredList(list);
  };
  const editItem = (id) => {
    dispatch({ type: "EDIT_TASK",payload:id })
    setIsEditing(true);
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
    // setEditId(id);
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
            placeholder="e.g.eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
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
          <List
            items={searchedList}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button className="clear-btn" onClick={clearlist}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}
function mapStateToProps(state) {
  const { list, searchedList, searchTerm } = state;

  return { list, searchedList, searchTerm };
}
export default connect(mapStateToProps)(App);
