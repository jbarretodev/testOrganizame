let categories = require("../database/dataSources/categories");

const findAllCategories = () => {
	return categories;
};

const findCategoryByName = (name) => {
	return categories.filter((elem) => {
		return elem.nombre_categoria == name;
	});
};

const findCategoryById = (id) => {
	return categories.filter((elem) => {
		return elem.id == id;
	});
};

const removeCategory = (id) => {
	const rs = categories.filter((elem) => {
		return elem.id == id;
	});

	if (!rs) return null;

	categories = categories.filter((elem) => {
		return elem.id != id;
	});

	return true;
};

const saveNewCategory = (dataCategory) => {
	dataCategory.id = categories.length + 1;
	categories.push(dataCategory);
	return dataCategory;
};

const updateCategory = (newData, id) => {
	const index = categories.findIndex((elem) => {
		return elem.id == id;
	});

	if (index == -1) return null;

	const elem = categories[index];
	newData.id = elem.id;
	categories[index] = newData;

	return categories[index];
};

module.exports = {
	findAllCategories,
	findCategoryByName,
	findCategoryById,
	removeCategory,
	saveNewCategory,
	updateCategory,
};
