const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router
	.get("/", categoryController.getAllCategories)
	.get("/:name", categoryController.findByName)
	.get("/:id/get-id", categoryController.findById)
	.post("/", categoryController.saveNewCategory)
	.delete("/:id", categoryController.deleteCategory)
	.put("/:id", categoryController.updateCategory);

module.exports = router;
