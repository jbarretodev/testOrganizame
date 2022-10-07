const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
	`Api Running on port ${port}.... http://localhost/api/v1/.... 🚀🚀`;
});
