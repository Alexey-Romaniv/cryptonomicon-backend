const {Ticker} = require("../models/ticker");
const {ctrlWrapper, HttpError} = require("../helpers/index");

const getAll = async (req, res) => {
  const {_id: owner} = req.user;
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  const result = await Ticker.find({owner}).populate(
    "owner",
    "email"
  );
  res.json(result);
};

const getById = async (req, res) => {
  const {tickerId: owner} = req.params;
  const result = await Ticker.findById({owner});
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Ticker.create({...req.body, owner});
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const {tickerId} = req.params;
  const result = await Ticker.findByIdAndUpdate(tickerId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const {tickerId} = req.params;
  const result = await Ticker.findByIdAndDelete(tickerId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "Contact delete",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
