import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ITEMS_EDIT,
  LIKE, UNLIKE
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const editItem = (id, name) => (dispatch, getState) => {
  axios
    .put(`/api/items/${id}`, name, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ITEMS_EDIT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const likeItem = (itemId, userId) => (dispatch, getState) => {
  axios
    .put("/api/items/new/like/", { itemId, userId }, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LIKE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const unlikeItem = (itemId, userId) => (dispatch, getState) => {
  axios
    .put("/api/items/new/unlike/", { itemId, userId }, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UNLIKE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
