const jwt = require("jsonwebtoken");
const dateUser = require("../database/dataSources/users");
require("dotenv").config();

const login = (credencials) => {
	const user = dateUser.filter((elem) => {
		return (
			elem.password == credencials.password && elem.user == credencials.user
		);
	});

	if (user.length == 0) return null;

	delete user[0].password;

	const token = jwt.sign(
		{ user },
		process.env.TOKEN_SECRET || "somerandomstring",
		{
			expiresIn: "2h",
		}
	);

	return {
		user,
		token,
	};
};

module.exports = {
	login,
};
