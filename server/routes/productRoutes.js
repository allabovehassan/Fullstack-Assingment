// const { validateTodo, validateTodoList } = require("./productValidation");
const { productModel } = require("../models/productModel");
const express = require("express");
const { default: mongoose } = require("mongoose");
const productRouter = express.Router();
const messages = require("../utils/messages");

productRouter.post("/create", async (req, res) => {
  try {
    // const { value, error } = validateTodo(req.body);
    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: messages.VALIDATION_ERROR,
    //     data: error,
    //   });
    // }

    // let taskExist = await todoModel.find({ task: value.task }).select("-_id task");

    // if (taskExist.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: messages.DUPLICATE_TASK,
    //     data: taskExist,
    //   });
    // }

    // let taskCreateObj = {
    //   task: value.task,
    //   dueDate: moment.utc(value.dueDate).toDate(),
    //   priority: value.priority,
    //   isCompleted: value.isCompleted,
    //   status: value.status ? true : value.status === false ? false : true,
    // };

    // let result = await todoModel.create(taskCreateObj);
    // if (result) {
    //   return res.status(200).json({
    //     success: true,
    //     message: messages.DATA_ADDED_SUCESS,
    //     data: result,
    //   });
      // }
      return res.status(200).json({
        success: true,
        message: "route working",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      message: messages.INTERNAL_SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
});

module.exports = { productRouter };
