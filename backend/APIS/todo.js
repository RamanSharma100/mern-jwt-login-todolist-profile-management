const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const authCheck = require("../middlewares/authCheck");

// post todo

router.post("/add", authCheck, async (req, res) => {
  const { title, done, user } = req.body;

  if (!title || !done || !user) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all fields!!" });
  }

  const todo = new Todo({
    title,
    done,
    user,
  });

  try {
    const savedTodo = await todo.save();
    res.status(200).json({
      success: true,
      todo: savedTodo,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

// get todos

router.get("/all/:userId", authCheck, async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await Todo.find({ user: userId });
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

// update todo

router.post("/done", authCheck, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all fields!!" });
  }

  // check todo present

  const todo = await Todo.findOne({ _id: id });

  if (!todo) {
    return res.status(404).json({ success: false, msg: "Todo not found!!" });
  }

  try {
    await Todo.updateOne(
      { _id: id },
      {
        $set: {
          done: true,
        },
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

// delete todo

router.post("/remove", authCheck, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill in all fields!!" });
  }

  // check todo present

  const todo = await Todo.findOne({ _id: id });

  if (!todo) {
    return res.status(404).json({ success: false, msg: "Todo not found!!" });
  }

  try {
    await Todo.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
});

module.exports = router;
