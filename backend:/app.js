require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger'); 
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { notFound } = require('./controllers/not-found-error');

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: 'https://mesto.olboris.students.nomoredomains.club',
};

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  runValidators: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('*', notFound);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
