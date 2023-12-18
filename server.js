const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
app.use(express.json());

// MongoDB and Mongoose setup
mongoose.connect('mongodb://localhost:27017/fitnessTracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose Schemas
const workoutSchema = new mongoose.Schema({
  type: String,
  duration: Number,
  calories_burned: Number
});

const nutritionSchema = new mongoose.Schema({
  meal: String,
  calories: Number,
  protein: Number
});

const goalSchema = new mongoose.Schema({
  goal_type: String,
  target: Number
});

// Mongoose Models
const Workout = mongoose.model('Workout', workoutSchema);
const Nutrition = mongoose.model('Nutrition', nutritionSchema);
const Goal = mongoose.model('Goal', goalSchema);

// CRUD Routes for workouts
app.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/workouts', [
  body('type').isLength({ min: 1 }),
  body('duration').isNumeric(),
  body('calories_burned').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.json(newWorkout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
