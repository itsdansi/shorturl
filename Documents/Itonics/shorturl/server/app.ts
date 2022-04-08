import express from 'express';
const app = express();
import mongoose from 'mongoose';
import urlRoute from './routes/urlRoute';
import userRoute from './routes/userRoute';
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
app.use(require('morgan')('dev'));
let port = process.env.PORT || 3001;

app.use('/', urlRoute);
app.use('/user', userRoute);

mongoose
  .connect('mongodb://localhost:27017/urls_shortener')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Could not connect to MongoDB');
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
