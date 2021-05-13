const express = require('express');
const path = require('path');
const task = require('./routes/task.route');
const auth = require('./routes/auth.route');
const {requireAuth} = require('./middleware/auth.middleware.js');

const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://admin:admin1234@cluster0.vazxx.mongodb.net/react-todo?retryWrites=true&w=majority';
let mongoDB = dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('client/build'));
app.use('/', express.static(__dirname + '/'));

app.use('/tasks', requireAuth)
app.use('/tasks',task);
app.use('/', auth);



// Express serve up index.html file if it doesn't recognize route
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
