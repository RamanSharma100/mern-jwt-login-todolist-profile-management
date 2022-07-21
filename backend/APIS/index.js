const express = require("express");
const router = express.Router();

const authAPI = require("./auth");
const todosAPI = require("./todo");

// auth api [Login, Register]
router.use("/auth", authAPI);

// todos api [addTodo, getTodos, updateTodo, deleteTodo]

router.use("/todos", todosAPI);

module.exports = router;
