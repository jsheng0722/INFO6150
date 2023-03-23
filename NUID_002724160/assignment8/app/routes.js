var User = require("./models/user");
const path = require("path");
const bcrypt = require("bcrypt");


module.exports = function (app) {
  // get
  app.get('/user/getAll', async (req, res) => {
    try {
      const users = await User.find({});
  
      const filteredUsers = users.map(user => ({
        userName: user.userName,
        email: user.email,
        password: user.password
      }));
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error('Error getting users:', error.message);
      res.status(500).send('Error getting users');
    }
  });

  // post
  app.post("/user/create", async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).send('Full name, email, and password are required');
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      userName,
      email,
      password: hash
    });

    try {
      await newUser.save();
      res.status(201).send(`User ${userName} (${email}) created`);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).send('Email already exists');
      } else {
        console.error(err);
        return res.status(500).send('Error creating user');
      }
    }
  });

  // put
  app.put("/user/edit/:id", async(req, res) => {
    const { id } = req.params;
    const { userName, password } = req.body;
  
    if (!userName || !password) {
      return res.status(400).send('Full name and password are required');
    }
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(userName)) {
      return res.status(400).send('Please enter a valid full name');
    }
  
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      return res.status(400).send('Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number');
    }
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
  
      user.userName = userName;
      user.password = hash;
      await user.save();
  
      res.status(200).send(`User ${user.userName} (${user.password}) updated`);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error updating user');
    }
  });

  // delete
  app.delete('/user/delete/:email', async (req, res) => {
    const { email } = req.params;
  
    try{
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send(`User with email ${email} not found`);
      }
    
      await user.deleteOne();
    
      res.send(`User with email ${email} deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Server error' });
    }
    
  });

  // useless
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/views/index.html"));
  });
};