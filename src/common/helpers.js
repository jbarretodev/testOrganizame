const categories = require("../database/dataSources/categories");
const products = require("../database/dataSources/products");

const validLengthNameSku = (value) => {
	return value.length <= 5;
};

const checkShortNameSku = (source, value) => {
	const index =
		source == "category"
			? categories.findIndex((elem) => {
					return elem.nombre_corto == value;
			  })
			: products.findIndex((elem) => {
					return elem.sku == value;
			  });

	return index == -1;
};

module.exports = {
	validLengthNameSku,
	checkShortNameSku,
};
