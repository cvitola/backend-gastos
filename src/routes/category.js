const express = require("express");
const categoryController = require("../controllers/category")

const router = express.Router();
//endPoint /api/category
router.get('/', categoryController.getAllCategories);

router.post('/', categoryController.createCategory)

module.exports = router;