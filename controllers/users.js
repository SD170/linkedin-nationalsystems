//	@desc		get all users
//	@route		GET /api/v1/bootcamps
//	@access	Public
exports.getUsers = (req, res, next) =>{
	res.status(200).json({success:true, msg:'shows all users'});
}

//	@desc		get single user
//	@route		GET /api/v1/bootcamps/:id
//	@access		Public
exports.getUser = (req, res, next) =>{
	res.status(200).json({success:true, msg:`shows user with id {req.params.id}`});
}


//	@desc		create a user
//	@route		POST /api/v1/bootcamps/:id
//	@access		Public
exports.createUser = (req, res, next) =>{
	res.status(200).json({success:true, msg:'creates a user'})
}


//	@desc		update a user
//	@route		PUT /api/v1/bootcamps/:id
//	@access		Public
exports.updateUser = (req, res, next) =>{
	res.status(200).json({success:true, msg:`updates user with id {req.params.id}`})
}

//	@desc		delete a user
//	@route		DELETE /api/v1/bootcamps/:id
//	@access		Public
exports.deleteUser = (req, res, next) =>{
	res.status(200).json({success:true, msg:`deletes user with id {req.params.id}`})
}



