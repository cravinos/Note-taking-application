const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: String,
  content: String,
  drawing: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Page', PageSchema);
