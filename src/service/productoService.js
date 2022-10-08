let products = require("../database/dataSources/products");
const { findCategoryById } = require("../service/categoryService");

const findAllProducts = () => {
	return products;
};

const findProductByName = (name) => {
	return products.filter((elem) => {
		return elem.nombre_producto == name;
	});
};

const findProductById = (id) => {
	return products.filter((elem) => {
		return elem.id == id;
	});
};

const removeProduct = (id) => {
	const rs = products.filter((elem) => {
		return elem.id == id;
	});

	if (!rs) return null;

	products = products.filter((elem) => {
		return elem.id != id;
	});

	return true;
};

const saveNewProduct = (dataProduct) => {
	const rs = findCategoryById(dataProduct.categoria);

	if (rs.length < 1) return null;

	dataProduct.id = products.length + 1;
	products.push(dataProduct);
	return dataProduct;
};

const updateProduct = (newData, id) => {
	const index = products.findIndex((elem) => {
		return elem.id == id;
	});

	if (index == -1) return null;

	const elem = products[index];
	newData.id = elem.id;
	products[index] = newData;

	return products[index];
};

const exportCsv = function () {
	return products.map(function (elem) {
		const category = findCategoryById(elem.categoria);

		return {
			sku: elem.sku,
			nombre_producto: elem.nombre_producto,
			precio: elem.precio,
			nombre_corto_categoria: category[0].nombre_corto,
			nombre_categoria: category[0].nombre_categoria,
			descripcion_categoria: category[0].descripcion,
		};
	});
};

module.exports = {
	findAllProducts,
	findProductByName,
	findProductById,
	removeProduct,
	saveNewProduct,
	updateProduct,
	exportCsv,
};
