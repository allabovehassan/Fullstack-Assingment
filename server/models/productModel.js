const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    dateOfInvoice: {
      type: Date,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      require: true,
    },
    fileName: {
      type: String,
      require: false,
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
