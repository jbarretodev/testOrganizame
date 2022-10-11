const categoryService = require("../service/categoryService");
const helpers = require("../common/helpers");

const getAllCategories = (req, res) => {
	return res.status(200).json(categoryService.findAllCategories());
};

const findByName = (req, res) => {
	if (!req.params.name)
		return res
			.status(400)
			.json({ error: true, message: "is missing the name" });

	const rs = categoryService.findCategoryByName(req.params.name);

	if (rs.length == 0)
		return res.status(404).json({ error: true, message: "category not found" });

	return res.status(200).json(rs[0]);
};

const findById = (req, res) => {
	if (!req.params.id)
		return res.status(400).json({ error: true, message: "is missing the id" });

	const rs = categoryService.findCategoryById(req.params.id);

	if (rs.length == 0)
		return res.status(404).json({ error: true, message: "category not found" });

	return res.status(200).json(rs[0]);
};

const saveNewCategory = (req, res) => {
	if (!helpers.validLengthShortName(req.body.nombre_corto))
		return res
			.status(400)
			.json({ error: true, message: "too long nombre_corto must be 5" });

	if (helpers.checkShortName("category", req.body.nombre_corto))
		return res
			.status(400)
			.json({ error: true, message: "there is a category with the same name" });

	return res.status(201).json(categoryService.saveNewCategory(req.body));
};

const deleteCategory = (req, res) => {
	if (!req.params.id)
		return res.status(400).json({ error: true, message: "id is missing" });

	const rs = categoryService.removeCategory(req.params.id);

	if (!rs)
		return res.status(404).json({ error: true, message: "category not found" });

	return res.status(204).json({});
};

const updateCategory = (req, res) => {
	if (!req.params.id)
		return res.status(400).json({ error: true, message: "id is missing" });

	if (!helpers.validLengthNameSku(req.body.nombre_corto))
		return res
			.status(400)
			.json({ error: true, message: "too long nombre_corto must be 5" });

	if (!helpers.checkShortNameSku("category", req.body.nombre_corto))
		return res
			.status(400)
			.json({ error: true, message: "there is a category with the same name" });

	const rs = categoryService.updateCategory(req.body, req.params.id);

	if (!rs)
		return res.status(404).json({ error: true, message: "category not found" });

	return res.status(200).json(rs);
};

module.exports = {
	getAllCategories,
	findByName,
	findById,
	saveNewCategory,
	deleteCategory,
	updateCategory,
};
