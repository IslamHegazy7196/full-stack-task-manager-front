let initialStore = {
  list: [],
  searchedList: [],
};

function reducer(state = initialStore, action) {
  if (action.type === "GET_ALL_TASKS") {
    return { ...state, list: action.payload, searchedList: action.payload };
  }
  if (action.type === "CLEAR_LIST") {
    return { ...state, list: [], searchedList: [] };
  }
  
  if (action.type === "SEARCH_TASK") {
    const newList = state.list.filter((specificItem) => {
      return specificItem.title.toLowerCase().includes(action.payload);
    });
    console.log(newList)
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

// if (action.type === "EDIT_TASK") {
//   let specificItem = state.list.find(
  //     (item) => item.state.id === action.payload
//   );
//   return {
  //     ...state,
//     editId: actiscription,
//   };
// }
// if (action.type === "END_EDIT") {
  //   try {
//     const newList = state.list.map((item) => {
  //       if (item) {
    //         if (item.state.id === state.editId) {
//           const { title } = item;
//           return {
  //             ...item,
  //             title: action.payload,
  //             description: action.description,
  //           };
//           return item;
//         }
//       }
//     });
//     return {
  //       ...state,
//       list: newList,
//       searchedList: newList,
//       editId: null,
//       editName: action.payload,
//     };
//   } catch (error) {
  //     console.log(error);
//   }
// }

// if (action.type === "ADD_TASK") {
//   const newItem = {
//     id: new Date().getTime().toString(),
//     title: action.payload,
//     description: action.description,
//   };

//   return {
//     ...state,
//     list: [...state.list, newItem],
//     searchedList: [...state.list, newItem],
//   };
// }