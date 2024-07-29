import express from 'express';
import config from './config';

const { port } = config;
const app = express();

app.get('/hello', (req, res) => res.send('hi'))

app.listen(port, () => console.log(port))