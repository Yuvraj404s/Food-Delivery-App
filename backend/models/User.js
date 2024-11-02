const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for manual and OAuth-based users
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return !this.googleId; // username is required only for manual sign-up
    },
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // password is required only for manual sign-up
    },
  },
  googleId: {
    type: String, // This will store the user's Google ID for OAuth-based sign-ins
    required: false, // Not required for non-OAuth users
  },
});

// Hash the password if modified (for manual sign-ups)
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') && !user.googleId) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
