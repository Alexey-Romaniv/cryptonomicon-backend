const express = require("express");

const ctrl = require("../../controllers/tickers");

const { validateBody, authenticate } = require("../../middlewares");
const { addSchema } = require("../../models/ticker");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:tickerId", authenticate, ctrl.getById);

router.post("/", authenticate, validateBody(addSchema), ctrl.add);

router.put(
  "/:tickerId",
  authenticate,
  validateBody(addSchema),
  ctrl.updateById
);


router.delete("/:tickerId", authenticate, ctrl.deleteById);

module.exports = router;
