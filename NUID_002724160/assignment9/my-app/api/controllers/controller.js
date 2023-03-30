const UserService = require('../services/service');
// const path = require("path");


async function getAllUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error.message);
    res.status(500).send('Error getting users');
  }
}

async function createUser(req, res) {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        return res.status(400).send('Full name, email, and password are required');
    }

  try {
    const user = await UserService.createUser({ userName, email, password });
    res.status(200).send(`User ${user.userName} (${user.email}) created`);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send('Email already exists');
    } else {
      console.error(err);
      return res.status(500).send('Error creating user');
    }
  }
}

async function editUser(req, res) {
    const userData = req.body;
    if (!userData.userName || !userData.password) {
      return res.status(400).send('Full name and password are required');
    }
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(userData.userName)) {
      return res.status(400).send('Please enter a valid full name');
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(userData.password)) {
      return res.status(400).send('Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number');
    }
    try {
        const user = await UserService.editUser(req.params.id, userData);
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        res.status(200).send(`User ${user.userName} (${user.email}) updated`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
}

async function deleteUser(req, res) {   
    try{
        const deletedUser = await UserService.deleteUser(req.params.email);
        if (!deletedUser) {
            return res.status(404).send(`User with email ${email} not found`);
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
}

async function userLogin(req, res) {
    const { userName, password } = req.body;
  
    try {
      const user = await UserService.getUser(userName, password);
      req.session.user = user;
      return res.status(200).send('Login successful');
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).send('Error during login');
    }
}

module.exports = {
    getAllUsers,
    createUser,
    editUser,
    deleteUser,
    userLogin,
};
