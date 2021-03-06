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

const whitelist = [
  'https://mesto.olboris.students.nomoredomains.club',
  'http://mesto.olboris.students.nomoredomains.club',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  runValidators: true,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(cors(corsOptions));
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

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('???????????? ???????????? ????????????');
  }, 0);
});

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
    name: Joi.string().min(2).max(30).default('??????-???? ??????????'),
    about: Joi.string().min(2).max(30).default('??????????????????????????'),
    avatar: Joi.string().regex(/^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})/).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), createUser);

app.use('*', notFound);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
