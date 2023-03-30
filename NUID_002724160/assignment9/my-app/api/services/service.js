const User = require('../models/user');
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        throw new Error(`Failed to get all users: ${err.message}`);
    }
};

const createUser = async (userData) => {
    const { userName, email, password } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('Email already exists');
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        userName,
        email,
        password: hash,
    });

    try {
        await user.save();
        return user;
    } catch (err) {
        throw new Error(`Failed to create new user: ${err.message}`);
    }
};

const editUser = async (id, userData) => {
    const { userName, password } = userData;

    if (!userName || !password) {
        throw new Error('Full name and password are required');
    }

    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(userName)) {
        throw new Error('Please enter a valid full name');
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        throw new Error('Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number');
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        user.userName = userName;
        user.password = hash;

        await user.save();
        return user;
    } catch (err) {
        throw new Error(`Failed to update user: ${err.message}`);
    }
};
  
const deleteUser = async (email) => {
    try {
      const deletedUser = await User.findOneAndDelete({ email });
      return deletedUser;
    } catch (err) {
      throw new Error(`Failed to delete user: ${err.message}`);
    }
};

const getUser = async (userName, password) => {
    try{
        const user = await User.findOne({ userName });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Password not match');
        }
        return user;
    } catch (err){
        throw new Error(`Failed to login: ${err.message}`);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    editUser,
    deleteUser,
    getUser,
  };