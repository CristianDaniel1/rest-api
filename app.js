import express, { json } from 'express';
import { artsRouter } from './routes/arts.js';
import { corsMiddleware } from './middlewares/cors.js';

// import fs from 'node:fs';
// const arts = JSON.parse(fs.readFileSync('./arts.json', 'utf-8'));

const app = express();

app.use(json());
app.use(corsMiddleware());

app.disable('x-powered-by');

app.use('/arts', artsRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
