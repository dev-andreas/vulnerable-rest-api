import express from 'express';
import { readFile } from 'fs/promises';
import 'dotenv/config'
import donors from './donors.js'
import donations from './donations.js'

const app = express();

app.use('/donor', donors);
app.use('/donation', donations);

app.use('/', async (req, res, next) => {
  const file = await readFile("./src/index.html", "utf-8");
  res.status(200).send(file);
});


// global error handler
app.use((err, req, res, next) => {
    res.status(500).json({error: 'Internal Server Error'});
  });

app.listen(process.env.PORT_NUMBER);