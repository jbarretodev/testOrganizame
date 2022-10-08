const productService = require("../service/productoService");
const helpers = require("../common/helpers");
const fs = require("fs");

const getAllProduct = (req, res) => {
	return res.status(200).json(productService.findAllProducts());
};

const findByName = (req, res) => {
	if (!req.params.name)
		return res
			.status(400)
			.json({ error: true, message: "is missing the name" });

	const rs = productService.findProductByName(req.params.name);

	if (rs.length == 0)
		return res.status(404).json({ error: true, message: "product not found" });

	return res.status(200).json(rs[0]);
};

const findById = (req, res) => {
	if (!req.params.id)
		return res.status(400).json({ error: true, message: "is missing the id" });

	const rs = productService.findProductById(req.params.id);

	if (rs.length == 0)
		return res.status(404).json({ error: true, message: "product not found" });

	return res.status(200).json(rs[0]);
};

const saveNewProduct = (req, res) => {
	if (!helpers.validLengthNameSku(req.body.sku))
		return res
			.status(400)
			.json({ error: true, message: "too long sku must be 5" });

	if (!helpers.checkShortNameSku("product", req.body.nombre_producto))
		return res
			.status(400)
			.json({ error: true, message: "there is a product with the same name" });

	const rs = productService.saveNewProduct(req.body);

	if (!rs)
		return res
			.status(400)
			.json({ error: true, message: "error category doesn't exist" });

	return res.status(201).json(rs);
};

const deleteProduct = (req, res) => {
	if (!req.params.id)
		return res.status(400).json({ error: true, message: "id is missing" });

	const rs = productService.removeProduct(req.params.id);

	if (!rs)
		return res.status(404).json({ error: true, message: "product not found" });

	return res.status(204).json({});
};

const updateProduct = (req, res) => {
	if (!req.params.id)
		return res.status(400).json({ error: true, message: "id is missing" });

	if (!helpers.validLengthNameSku(req.body.sku))
		return res
			.status(400)
			.json({ error: true, message: "too long nombre_producto must be 5" });

	if (!helpers.checkShortNameSku("product", req.body.nombre_producto))
		return res
			.status(400)
			.json({ error: true, message: "there is a product with the same name" });

	const rs = productService.updateProduct(req.body, req.params.id);

	if (!rs)
		return res.status(404).json({ error: true, message: "product not found" });

	return res.status(200).json(rs);
};

const exportCsv = (req, res) => {
	const rs = productService.exportCsv();
	fs.writeFileSync("export.csv", toCsv(rs));
	res.download("export.csv");
};

const toCsv = (data) => {
	const array = [Object.keys(data[0])].concat(data);

	return array
		.map((it) => {
			return Object.values(it).toString();
		})
		.join("\n");
};

module.exports = {
	getAllProduct,
	findByName,
	findById,
	saveNewProduct,
	deleteProduct,
	updateProduct,
	exportCsv,
};
