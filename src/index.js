const express = require("express");
const authRouter = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const exportRoute = require("./routes/export");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/categories/", categoryRoute);
app.use("/api/v1/products/", productRoute);
app.use("/export/", exportRoute);

app.listen(port, () => {
	console.log(
		`Api Running on port ${port}.... http://localhost/api/v1/.... 🚀🚀`
	);
});
