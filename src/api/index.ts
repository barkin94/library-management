import express from "express";
import usersRouter from './routes/users';
import booksRouter from './routes/books';
import { getConfig } from "../config";
import bodyParser from "body-parser";

const { port } = getConfig();

const app = express();

app.use(bodyParser.json())
app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
});

export default app;
// let serverInitPromise = new Promise<typeof app>((resolve) => {
// 	app.listen(port, () => {
// 		console.log(`Listening on port ${port}`)
// 		resolve(app);
// 	});
// });

// export default serverInitPromise;
