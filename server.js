const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const UserRoute = require('./app/routes/user')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});



app.use('/user',UserRoute)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

