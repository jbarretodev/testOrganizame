const authService = require("../service/authService");

const login = (req, res) => {
	if (!req.body.hasOwnProperty("user") || !req.body.hasOwnProperty("password"))
		return res
			.status(400)
			.json({
				error: true,
				message: "Error! BadRequest some values is missing",
			});

  const rs = authService.login(req.body)

  if(!rs) return res.status(404).json({error: true, message: "error user not found"})

  return res.status(200).json(rs)
};

module.exports = {
  login,
}
