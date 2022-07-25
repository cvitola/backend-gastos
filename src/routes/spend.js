const express = require("express");
const spendController = require("../controllers/spend")

const router = express.Router();
//endPoint /api/spends
router.get('/', spendController.getAllSpends);

router.post('/', spendController.createSpend)

module.exports = router