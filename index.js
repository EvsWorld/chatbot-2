import 'dotenv/config';
import express from 'express';
import { connectDb } from './db';
import routes from './routes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ extended: true }));

app.use(
  morgan(':method :url  :req[header]  |   :response-time  |  :date[web]')
);

app.use('/ping', (req, res) => {
  res.status(200).json({
    appName: 'API',
    version: process.env.npm_package_version,
    status: 'Reallly good!!',
  });
});

app.use('/api/replies', routes.replies);

app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).send({ message: 'route not found' });
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

connectDb().then(async () => {
  app.listen(PORT, (error) => {
    if (error) {
      console.log(`
    \n\n
    Server Listening!

    API:

    Status: Error
    Log: ${error}
    \n\n

    `);
    } else {
      console.log(`
    \n\n

    API server running on port ${PORT}

      \n\n
    `);
    }
  });
});
