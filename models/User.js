const mongoose = require('mongoose');
const errorResponse = require("../utils/errorResponse");
const bcrypt = require('bcrypt');
var fs = require('fs');


const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,'Please add a name'],
		trim:true,
		maxlength:[100,`Name Can't be more than 50 charecters`]
	},
	email: {
	    type: String,
	    uniue: true,
	    match: [
	      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm,
	      "Please add a valid email",
	    ],
	},
	phone:{
		type:String,
		uniue: true,
		required:[true,'Please add a phone-no'],
	},
	password:{
		type:String,
		required:[true,'Please add a password'],
	},
	photo: {
		type: String,
		default: "no-photo.jpeg",
	},
	photoFile: {
		data: Buffer, 
		contentType: String 
	},
	createdAt: {
		type: Date,
    	default: Date.now,
  	},
})

//password hashing
UserSchema.pre('save', async function (next){
	try{
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	}catch(err){
		next(err);
	}
})

UserSchema.pre('save', async function (next){
	try{
		this.photoFile.data = fs.readFileSync(this.photo);
		this.photoFile.contentType = 'image/png';
		if(this.photoFile.data.byteLength > 2100000){
			next(new errorResponse (`Max file size is 2MB`, 404))
		}
		next();
	}catch(err){
		next(err);
	}
})


module.exports = mongoose.model('User', UserSchema);

