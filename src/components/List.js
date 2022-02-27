import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
const List = ({ searchedList, removeItem, editItem }) => {
  return (
    <>
      {searchedList.map((item) => {
        if (item) {
          const { id, title, description } = item;
          return (
            <div className="task-wrapper"key={id}>
              <article  className="task-item">
                <h4 className="title">{title}</h4>
                <div className="btn-container">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editItem(id, title, description)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem(id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
              <article className="task-item">
                <p className="title">{description}</p>
              </article>
            </div>
          );
        }else{return<></>}
      })}
    </>
  );
};
function mapStateToProps(state) {
  const { searchedList } = state;

  return { searchedList };
}
export default connect(mapStateToProps)(List);
