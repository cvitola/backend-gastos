const express = require("express");
const spendController = require("../controllers/spend")

const router = express.Router();
//endPoint /api/spends
router.get('/', spendController.getAllSpends);

router.post('/', spendController.createSpend);

router.get('/byuser/:id' , spendController.getSpendsByUser);

router.delete('/:id', spendController.deleteSpend);

module.exports = router;