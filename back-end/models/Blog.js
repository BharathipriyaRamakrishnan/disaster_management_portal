const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  description: String,
});

module.exports = mongoose.model('Blog', blogSchema);
