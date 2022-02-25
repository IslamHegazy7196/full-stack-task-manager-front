import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
const List = ({ searchedList, removeItem, editItem }) => {
  return (
    <>
      {searchedList.map((item) => {
        if(item){
        const { id, title } = item;
        return (
          <article key={id} className="task-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
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
        );
      }})}
    </>
  );
};
function mapStateToProps(state) {
  const { searchedList } = state;

  return { searchedList };
}
export default connect(mapStateToProps)(List);
