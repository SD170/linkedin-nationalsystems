const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,'Please add a name'],
		trim:true,
		maxlength:[100,`Name Can't be more than 50 charecters`]
	},
	email: {
	    type: String,
	    // uniue: true,
	    match: [
	      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm,
	      "Please add a valid email",
	    ],
	},
	phone:{
		type:String,
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


})

module.exports = mongoose.model('User', UserSchema);

