const { productModel } = require("../models/productModel");
const express = require("express");
const { default: mongoose, model } = require("mongoose");
const productRouter = express.Router();
const messages = require("../utils/messages");
const moment = require("moment");
const multer = require("multer");
const { validateProduct } = require("./productValidation");
const storage = multer.diskStorage({
  destination: "../assests",
  filename(req, file, cb) {
    let fileName = file.originalname;
    if (file.mimetype === "application/pdf") {
      cb(null, `${fileName.split(".")[0]}.pdf`);
    }
    if (
      file.mimetype === "application/msword" ||
      file.mimetype === "application/octet-stream" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, `${fileName}.doc`);
    }
    if (
      file.mimetype !== "application/pdf" &&
      file.mimetype !== "application/msword" &&
      file.mimetype !== "application/octet-stream" &&
      file.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return cb(new Error("Something went wrong"), false);
    }
  },
});
const upload = multer({
  storage,
});

productRouter.post("/create", upload.single("uploadFile"), async (req, res) => {
  try {
    const { value, error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: messages.VALIDATION_ERROR,
        data: error,
      });
    }

    let productExist = await productModel.find({ serialNumber: value.serialNumber }).select("-_id serialNumber");

    if (productExist.length > 0) {
      return res.status(400).json({
        success: false,
        message: messages.DUPLICATE_SERIAL,
        data: productExist,
      });
    }
    let productCreateObj = {
      category: value.category,
      dateOfInvoice: moment.utc(value.dateOfInvoice).toDate(),
      serialNumber: value.serialNumber,
      model: value.model,
      fileName: req.file ? req.file.originalname : null,
      status: value.status ? true : value.status === false ? false : true,
    };

    let result = await productModel.create(productCreateObj);

    if (req.file && req.file.originalname) {
      let Id = result._id;
      let updatedData = await productModel.findByIdAndUpdate(
        { _id: Id }, // Filter
        { fileName: Id }, // Update
        { new: true }
      );
      if (updatedData) {
        return res.status(200).json({
          success: true,
          message: messages.DATA_ADDED_SUCESS_WITH_FILE,
          data: updatedData,
        });
      }
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: messages.DATA_ADDED_SUCESS_WITHOUT_FILE,
        data: result,
      });
    }
    return res.status(200).json({
      success: true,
      message: "not added",
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
