const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const auth = require('../../utils/jwtAuth');

router.post('/login', userController.login);
router.get('/me', auth.verifyToken, userController.verifyToken);
router.post('/register', userController.signUp);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/', auth.verifyToken, userController.getAllUsers);
router.get('/:id', userController.getUser);

module.exports = router;