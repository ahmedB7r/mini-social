import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ITEMS_EDIT,
  LIKE,
  UNLIKE
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    case ITEMS_EDIT:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };

    case LIKE:
      var itemss = state.items.filter(item => item._id === action.payload._id);
      var num = state.items.indexOf(itemss[0]);

      state.items.splice(num, 1, action.payload);
      return {
        ...state,
        items: state.items

      };
    case UNLIKE:
      itemss = state.items.filter(item => item._id === action.payload._id);
      num = state.items.indexOf(itemss[0]);
      state.items.splice(num, 1, action.payload);
      return {
        ...state,
        items: state.items
      };
    default:
      return state;
  }
}
