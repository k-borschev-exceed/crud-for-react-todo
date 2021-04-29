const express = require('express');
const task = require('./routes/task.route');
const auth = require('./routes/auth.route');
const {checkUser, requireAuth} = require('./middleware/auth.middleware.js');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

app.use('/tasks',task);
app.get('/checkAuth', requireAuth)
app.get('/checkUser', checkUser)

app.use('/', auth);


const port = 3001;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
