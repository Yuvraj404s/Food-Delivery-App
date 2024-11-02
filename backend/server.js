const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const cuisineRoutes = require('./routes/cuisines');
const foodRoutes = require('./routes/food');
//const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
require('dotenv').config();
require('./config/passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User'); // Import the User model

const app = express();

// Configure passport.js to use the Google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find existing user in MongoDB
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // User exists, no need to create a new one
        return done(null, existingUser);
      }

      // Create a new user if they don't exist
      const newUser = await new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        profileImageUrl: profile.photos[0].value,
      }).save();

      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Middleware
app.use(cors());
app.use(express.json());

// Express session for OAuth
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cuisines', cuisineRoutes);
//app.use('/api/orders', orderRoutes);
// server.js
const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

// Add this route for food items
app.use('/api/food', foodRoutes);
// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth login route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('http://localhost:3000/home');  // Redirect to React app after login
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Route to check user status
app.get('http://localhost:5000/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
