/* eslint-disable no-unused-vars */
import express from 'express';
import { router } from './routes/index.routes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  return response
    .status(200)
    .json({ message: 'OK' });
});

app.use('/api/v1', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: err.message,
    data: null,
  });
});
