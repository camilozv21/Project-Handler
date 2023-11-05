const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    require: true
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
