const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
  task: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  key: { type: Number, required: true, unique: true },
});

// Export the model
module.exports = mongoose.model('Todo', TodoSchema);
