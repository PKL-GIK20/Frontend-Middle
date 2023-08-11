// redux/reducers.js

const initialState = {
  selectedItems: [], 
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        selectedItems: state.selectedItems.map(item =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        selectedItems: state.selectedItems.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
