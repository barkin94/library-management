import express from "express";
import config from "../config";
import expressJoiValidation from "express-joi-validation";

const validator = expressJoiValidation.createValidator({});

const { port } = config;
const app = express();

app.get("/users", (req, res) => {
	getUsers()
});

app.listen(port, () => console.log(port));
