const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://dbUser:Hongqi1017@cluster0.otd8w5p.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Add authentication routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/task'));
app.use('/api/globaltask', require('./routes/globalTask'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
