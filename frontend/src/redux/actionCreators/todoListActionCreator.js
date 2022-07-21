import * as types from "../actionTypes/todoListActionTypes";
import axios from "axios";
import { toast } from "react-toastify";

// actions

const addTodo = (payload) => ({
  type: types.ADD_TODO,
  payload,
});

const removeTodo = (payload) => ({
  type: types.REMOVE_TODO,
  payload,
});

const doneTodo = (payload) => ({
  type: types.DONE_TODO,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setTodos = (payload) => ({
  type: types.SET_TODOS,
  payload,
});

// action creators

export const postTodo = (todoData) => (dispatch) => {
  axios
    .post(`${import.meta.env.VITE_Backend_EndPoint}/todos/add`, todoData)
    .then((res) => {
      toast.success("Todo added successfully!");
      dispatch(addTodo(res.data.todo));
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
    });
};

export const deleteTodo = (todoId) => (dispatch) => {
  axios
    .post(`${import.meta.env.VITE_Backend_EndPoint}/todos/remove`, {
      id: todoId,
    })
    .then((res) => {
      toast.success("Todo removed successfully!");
      dispatch(removeTodo(todoId));
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
    });
};

export const updateTodo = (todoId) => (dispatch) => {
  axios
    .post(`${import.meta.env.VITE_Backend_EndPoint}/todos/done`, {
      id: todoId,
    })
    .then((res) => {
      toast.success("Todo updated successfully!");
      dispatch(doneTodo(todoId));
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
    });
};

export const getTodos = (userId) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`${import.meta.env.VITE_Backend_EndPoint}/todos/all/${userId}`)
    .then((res) => {
      dispatch(setTodos(res.data.todos));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
      dispatch(setLoading(false));
    });
};

export const setTheLoading = (isLoading) => (dispatch) => {
  dispatch(setLoading(isLoading));
};
