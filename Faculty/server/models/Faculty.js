const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: String,
  email: String,
  faculty_id: String,
  dept: String,
  profession: String,
});

module.exports = mongoose.model('Faculty', facultySchema);
