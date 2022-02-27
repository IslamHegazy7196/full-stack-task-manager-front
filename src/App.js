import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import { connect } from "react-redux";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/v1/tasks";

function App({ dispatch, list }) {
  // useStates
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [editId, setEditId] = useState("1");
  // useRef
  const searchValue = React.useRef("");
  //  get tasks
  const getalltasks = () => {
    try {
      axios.get(BASE_URL).then((res) => {
        dispatch({ type: "GET_ALL_TASKS", payload: res.data });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // main functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      showAlert(true, "danger", "please enter two value");
    } else if (name && description && isEditing) {
      try {
        (async () => {
          await axios.put(`${BASE_URL}/${editId}`, {
            title: name,
            description: description,
          });
        })()(async () => {
          await getalltasks();
        })();
      } catch (error) {
        console.log(error);
      }
      setName("");
      setDescription("");
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      try {
        (async () => {
          await axios.post(BASE_URL, {
            title: name,
            description: description,
          });
        })();
        showAlert(true, "success", "item added to the list");
        setName("");
        setDescription("");
        (async () => {
          await getalltasks();
        })();
      } catch (error) {
        console.log(error);
      }
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
    try {
      (async () => {
        await axios.delete(BASE_URL);
      })();
      showAlert(true, "danger", "Empty List");
      dispatch({ type: "CLEAR_LIST" });
    } catch (error) {
      console.log(error);
      showAlert(true, "danger", "something went wrong");
    }
  };
  const removeItem = (id) => {
    try {
      (async () => {
        await axios.delete(`${BASE_URL}/${id}`);
      })();
      (async () => {
        await getalltasks();
      })();
      showAlert(true, "danger", "item removed");
    } catch (error) {
      console.log(error);
      showAlert(true, "danger", "something went wrong");
    }
  };
  const editItem = (id, title, description) => {
    setIsEditing(true);
    setName(title);
    setDescription(description);
    setEditId(id);
  };
  useEffect(() => {
    (async () => {
      await getalltasks();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

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
        <p>description</p>
        <div className="form-control">
          <input
            type="text"
            className="task"
            placeholder="Add simple description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
  const { list } = state;

  return { list };
}
export default connect(mapStateToProps)(App);
