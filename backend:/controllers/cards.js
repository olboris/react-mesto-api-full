const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') {
        error = new BadRequestError('Ошибка валидации');
      }
      next(error);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => next(new NotFoundError('Карточка не найдена')))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw next(new ForbiddenError('Вы не можете удалить карточку'));
      }
      return Card.findByIdAndRemove(id)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') {
        error = new BadRequestError('Ошибка валидации');
      } else if (err.name === 'CastError') {
        error = new BadRequestError('Переданы некорректные данные');
      }
      next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') {
        error = new BadRequestError('Ошибка валидации');
      } else if (err.name === 'CastError') {
        error = new BadRequestError('Переданы некорректные данные');
      }
      next(error);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      console.log(card._id);
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') {
        error = new BadRequestError('Ошибка валидации');
      } else if (err.name === 'CastError') {
        error = new BadRequestError('Переданы некорректные данные');
      }
      next(error);
    });
};
