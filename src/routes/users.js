const { Router } = require('express');
const { knex } = require('../config/db');
const UserController = require('../controllers/UserController');
const UserModel = require('../models/UserModel');

const userModel = new UserModel(knex);
const userController = new UserController(userModel);

const router = new Router({ mergeParams: true });

router.post('/', userController.post.bind(userController));

module.exports = router;

