const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
  task: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  key: { type: Number, required: true, unique: true },
});

// Export the model
module.exports = mongoose.model('Task', TaskSchema);
