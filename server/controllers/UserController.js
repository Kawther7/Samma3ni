const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


// create user
const signup=async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (user)
		return res
			.status(403)
			.send({ message: "User with given email already Exist!" });

	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	let newUser = await new User({
		...req.body,
		password: hashPassword,
	}).save();

	newUser.password = undefined;
	newUser.__v = undefined;
	res
		.status(200)
		.send({ data: newUser, message: "Account created successfully" });
};

const login= async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res.status(400).send({ message: "invalid email or password!" });

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
		return res.status(400).send({ message: "Invalid email or password!" });

	const token = user.generateAuthToken();
	res.status(200).send({ data: token, message: "Signing in please wait..." });
};

// get all users
const getAllUsers=async (req, res) => {
	const users = await User.find().select("-password -__v");
	res.status(200).send({ data: users });
};

// get user by id
const getUserById= async (req, res) => {
	const user = await User.findById(req.params.id).select("-password -__v");
	res.status(200).send({ data: user });
};

// update user by id
const updateUserById= async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -__v");
	res.status(200).send({ data: user, message: "Profile updated successfully" });
};

// delete user by id
const deleteUserById= async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Successfully deleted user." });
};


module.exports={
    signup,login,getAllUsers,getUserById,deleteUserById,updateUserById
}