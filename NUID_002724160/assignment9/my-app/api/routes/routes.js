const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/user/getAll', controller.getAllUsers);
router.post('/user/create', controller.createUser);
router.post('/login', controller.userLogin);
router.put('/user/edit/:id', controller.editUser);
router.delete('/user/delete/:email', controller.deleteUser);

module.exports = router;