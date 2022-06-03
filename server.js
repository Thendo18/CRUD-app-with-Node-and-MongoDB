const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser= require('body-parser');

// console.log('May Node be with you')

//This part shows when making callbacks
// MongoClient.connect("connectionString", {
//   useUnifiedTopology: true
// }, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
// })


// using promises
MongoClient.connect("mongodb+srv://Thendo:<Thendo@12345>@cluster0.8x1wf.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('crud-app-quotes')
    const quotesCollection = db.collection('quotes')
 
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
  })

// app.get(endpoint, callback)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  })


  app.post('/quotes', (req, res) => {
    // console.log(req.body)
    quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
  })

  })
  .catch(console.error)