const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const tickerSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title of ticker"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false }
);

tickerSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),

});



const Ticker = model("ticker", tickerSchema);


module.exports = { Ticker, addSchema };
