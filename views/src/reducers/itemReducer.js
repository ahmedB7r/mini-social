import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ITEMS_EDIT,
  LIKE,
  UNLIKE, COMMENT
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};
let itemss, num;
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
      itemss = state.items.filter(item => item._id === action.payload.postId);
      num = state.items.indexOf(itemss[0]);
      itemss[0].name = action.payload.data;
      state.items.splice(num, 1, itemss[0]);
      return {
        ...state,
        items: state.items
      };

    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };

    case LIKE:
      itemss = state.items.filter(item => item._id === action.payload.postId);
      num = state.items.indexOf(itemss[0]);
      itemss[0].likes = action.payload.data;
      state.items.splice(num, 1, itemss[0]);
      return {
        ...state,
        items: state.items

      };
    case UNLIKE:
      itemss = state.items.filter(item => item._id === action.payload.postId);
      num = state.items.indexOf(itemss[0]);
      itemss[0].likes = action.payload.data;
      state.items.splice(num, 1, itemss[0]);
      return {
        ...state,
        items: state.items
      };
    case COMMENT:
      itemss = state.items.filter(item => item._id === action.payload.postId);
      num = state.items.indexOf(itemss[0]);
      itemss[0].comments = action.payload.data;
      state.items.splice(num, 1, itemss[0]);
      return {
        ...state,
        items: state.items
      };

    default:
      return state;
  }
}
