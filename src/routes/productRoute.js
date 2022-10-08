const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router
	.get("/", productController.getAllProduct)
	.get("/:name", productController.findByName)
	.get("/:id/get-id", productController.findById)
	.post("/", productController.saveNewProduct)
	.delete("/:id", productController.deleteProduct)
	.put("/:id", productController.updateProduct)
	.get("/export", productController.exportCsv);

module.exports = router;
