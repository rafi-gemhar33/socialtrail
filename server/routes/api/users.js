const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', userController.getUser);
router.get('/:id', userController.getAllUsers);
router.post('/login', userController.login);
router.post('/register', userController.signUp);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);

module.exports = router; 