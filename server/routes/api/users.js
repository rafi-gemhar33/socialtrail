const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.post('/login', userController.login);
router.post('/register', userController.signUp);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

module.exports = router;