import React, { useState, useEffect } from "react";
const initialStore = {
  list: [],
  searchedList: [],
  searchTerm: "",
  editId: null,
};
// const [editId, setEditId] = useState(null);
// const [filteredList, setFilteredList] = useState('');

function reducer(state = initialStore, action) {
  if (action.type === "CLEAR_LIST") {
    return { ...state, list: [], searchedList: [] };
  }
  if (action.type === "ADD_TASK") {
    const newItem = {
      id: new Date().getTime().toString(),
      title: action.payload,
    };

    return {
      ...state,
      list: [...state.list, newItem],
      searchedList: [...state.list, newItem],
    };
  }
  if (action.type === "REMOVE_TASK") {
    return {
      ...state,
      list: state.list.filter((item) => item.id !== action.payload),
      searchedList: state.searchedList.filter(
        (item) => item.id !== action.payload
      ),
    };
  }
  if (action.type === "EDIT_TASK") {
    const specificItemId = state.list.find(
      (item) => item.id === action.payload
    );
    return {
      ...state,
      editId: action.payload,
    };
  }
  if (action.type === "END_EDIT") {
    const newList = state.list.map((item) => {
      if (item.id === state.editId) {
        return { ...item, title: action.payload };
        return item;
      }
    });
    return {
      ...state,
      list: newList,
      searchedList: newList,
      editId: null,
    };
  }
  if (action.type === "SEARCH_TASK") {
    const newList = state.list.filter((specificItem) => {
      return specificItem.title.toLowerCase().includes(action.payload);
    });
    if (action.payload.length < 1) {
      return {
        ...state,
        searchTerm: "",
        searchedList: state.list,
      };
    }
    return {
      ...state,
      searchTerm: action.payload,
      searchedList: newList,
    };
  }

  return state;
}

export default reducer;