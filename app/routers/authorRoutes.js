const express = require('express');
const UserModel = require('../datamappers/user.datamapper');
const userCreateSchema = require('../schemas/userCreateSchema');
const userValidator = require('../middlewares/userValidator');

const router = Router.express();

router.post('/', userValidator(userCreateSchema), UserModel.create);
