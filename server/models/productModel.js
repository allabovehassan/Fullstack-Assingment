const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    priority: {
      type: String,
      required: false,
    },
    isCompleted: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const productModel = mongoose.model("myProducts", productSchema);
module.exports = { productModel };
