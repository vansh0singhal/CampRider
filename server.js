
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
console.log('MONGODB_URI:', uri);




if (!uri) {
  console.error('MongoDB URI is not defined!'); // Log an error if undefined
  process.exit(1); // Exit the application
}






// MongoDB connection
mongoose.connect(uri, {
  
})
.then(() => {
  console.log('Connected to MongoDB');


  
})

.catch(err => {
  console.error('MongoDB connection error:', err);
});
// Updated CORS configuration
app.use(cors({
  origin: ['http://127.0.0.1:5500'],
  credentials: true
}));
app.use(express.json());

// User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// Register user
app.post('/api/register', async (req, res) => {
  console.log('Received registration request:', req.body);
  const { username, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'An error occurred during registration.', error: err.message });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  console.log('Received login request:', req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    console.log('JWT Secret:', process.env.JWT_SECRET);


    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});




// Review schema and model
const reviewSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Add review route
app.post('/api/reviews', async (req, res) => {
  const { reviewerName, reviewText } = req.body;

  try {
    const newReview = new Review({
      reviewerName,
      reviewText
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully!' });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: 'An error occurred while adding the review.' });
  }
});

// Route to fetch all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'An error occurred while fetching reviews.' });
  }
});





// campsites api->






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






