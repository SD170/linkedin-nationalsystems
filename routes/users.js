const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({success:true, msg:'shows all users'})
})

router.get('/:id', (req, res) => {
	res.status(200).json({success:true, msg:`shows user with id {req.params.id}`})
})

router.post('/', (req, res) => {
	res.status(200).json({success:true, msg:'creates all users'})
})

router.put('/:id', (req, res) => {
	res.status(200).json({success:true, msg:`updates user with id {req.params.id}`})
})

router.delete('/:id', (req, res) => {
	res.status(200).json({success:true, msg:`deletes user with id {req.params.id}`})
})

module.exports = router;
