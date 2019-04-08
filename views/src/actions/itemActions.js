import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ITEMS_EDIT,
  LIKE, UNLIKE,
  COMMENT
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
let data, postId, all;
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

export const addItem = post => (dispatch, getState) => {
  axios
    .post("/api/items", post, tokenConfig(getState))
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
    .then(res => {
      data = res.data;
      postId = id;
      all = { data, postId };
      dispatch({
        type: ITEMS_EDIT,
        payload: all
      })
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const likeItem = (itemId, userId) => (dispatch, getState) => {
  console.log(userId);

  axios
    .put(`/api/items/new/like/${itemId}`, { userId }, tokenConfig(getState))
    .then(res => {
      data = res.data;
      postId = itemId;
      all = { data, postId };
      dispatch({
        type: LIKE,
        payload: all
      })
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const unlikeItem = (itemId, userId) => (dispatch, getState) => {
  axios
    .put("/api/items/new/unlike/", { itemId, userId }, tokenConfig(getState))
    .then(res => {
      data = res.data;
      postId = itemId;
      all = { data, postId };

      dispatch({
        type: UNLIKE,
        payload: all
      })
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const comment = post => (dispatch, getState) => {
  axios
    .put(`/api/items/new/comment/${post.postId}`, post, tokenConfig(getState))
    .then(res => {
      data = res.data;
      postId = post.postId;
      all = { data, postId };
      dispatch({
        type: COMMENT,
        payload: all
      })
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
