const express = require('express');
//importing controller functions
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/users');


const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
