const jwt = require("jsonwebtoken");
const dateUser = require("../database/datasourse");
require("dotenv").config();

const login = (credencials) => {
	const user = dateUser.filter((elem) => {
		return (
			elem.password == credencials.password && elem.user == credencials.user
		);
	});

	if (user.length == 0) return null;

	const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
		expiresIn: "2h",
	});

	return {
		user,
		token,
	};
};

module.exports = {
	login,
};
