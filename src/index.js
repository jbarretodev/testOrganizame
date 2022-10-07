const express = require("express");
const authRouter = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/auth/", authRouter);

app.listen(port, () => {
	console.log(
		`Api Running on port ${port}.... http://localhost/api/v1/.... 🚀🚀`
	);
});
