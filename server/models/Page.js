const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: String,
  content: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }
});

module.exports = mongoose.model('Page', PageSchema);