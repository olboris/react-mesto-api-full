const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})/),
  }),
}), createCard);

router.delete('/:id', celebrate({
  body: Joi.object().keys({
    ObjectID: Joi.string().hex().length(24),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  body: Joi.object().keys({
    ObjectID: Joi.string().hex().length(24),
  }),
}), likeCard);

router.delete('/:id/likes', celebrate({
  body: Joi.object().keys({
    ObjectID: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
