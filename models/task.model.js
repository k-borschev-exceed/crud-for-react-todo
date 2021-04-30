const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  author: {type: String, required: true}
});

module.exports = mongoose.model('Task', TaskSchema);
