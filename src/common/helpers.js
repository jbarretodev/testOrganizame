const categories = require("../database/dataSources/categories");
const products = require("../database/dataSources/products");

const validLengthShortName = (value) => {
	return value.length <= 5;
};

const checkShortName = (source, value) => {
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

const toCsv = (data) => {
	const array = [Object.keys(data[0])].concat(data);

	return array
		.map((it) => {
			return Object.values(it).toString();
		})
		.join("\n");
};

module.exports = {
	validLengthShortName,
	checkShortName,
	toCsv,
};
