const express = require('express');
const bodyParser = require('body-parser');
const todo = require('./routes/todo.route');
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://admin:admin1234@cluster0.vazxx.mongodb.net/react-todo?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/todos', todo);
let port = 3001;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});