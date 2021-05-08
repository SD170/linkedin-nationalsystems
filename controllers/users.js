const errorResponse = require("../utils/errorResponse");
const User = require('../models/User');
const asyncHandler = require("../middlewares/async");

//	@desc		get all users
//	@route		GET /api/v1/users
//	@access		Public
exports.getUsers = asyncHandler(async (req, res, next) =>{
	let query;

	// Copy req.query
	const reqQuery = { ...req.query };

	// Fields to exclude like select, sort etc
	const removeFields = ["select", "sort", "page", "limit"];

	// Delete removeFields from query
	removeFields.forEach((field) => delete reqQuery[field]);


	// Copy query string
	let queryString = JSON.stringify(reqQuery);

	// Create operators ($gt, $lt, $lte etc)
	queryString = queryString.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);


	//finding resource
	query = User.find(JSON.parse(queryString));

	// Select fields
	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		query = query.select(fields);
	}

	  // Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	} else {
		query = query.sort("-createdAt");
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 100;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await User.countDocuments();

	query = query.skip(startIndex).limit(limit);


	const user = await query;

	// Pagination esult
	const pagination = {};

	if(endIndex<total){
		pagination.next = {
		  page: page+1,
		  limit:limit
		}
	}
	if(startIndex > 0){
		pagination.prev = {
		  page:page-1,
		  limit:limit
		}
	}

	res.status(200).json({success:true, count:user.length, pagination: pagination, data:user});

})

//	@desc		get single user
//	@route		GET /api/v1/users/:id
//	@access		Public
exports.getUser = asyncHandler(async (req, res, next) =>{

	const user = await User.findById(req.params.id);
	if(!user){
		return next(new errorResponse (`User not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({success:true, data:user});

	
})


//	@desc		create a user
//	@route		POST /api/v1/users/:id
//	@access		Public
exports.createUser = asyncHandler( async (req, res, next) =>{

	const user = await User.create(req.body);
	res.status(201).json({success:true, data:user});

})


//	@desc		update a user
//	@route		PUT /api/v1/users/:id
//	@access		Public
exports.updateUser = asyncHandler (async (req, res, next) =>{
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})

	if(!user){
		return next(new errorResponse(`User not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({success:true, data:user});
})
//	@desc		delete a user
//	@route		DELETE /api/v1/users/:id
//	@access		Public
exports.deleteUser = asyncHandler (async(req, res, next) =>{
	const user = await User.findByIdAndDelete(req.params.id)

	if(!user){
      new errorResponse(`User not found with id of ${req.params.id}`, 404)
	}
	res.status(200).json({success:true, data:{}});

})



