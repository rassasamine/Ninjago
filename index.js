const express = require ('express');
const routes = require('./routes/api');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

//  set up express app
const port = process.env.PORT || 4000;
const app = express();

//  connect to mongodb
mongoose.connect('mongodb://localhost:27017/ninjago')
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));
mongoose.Promise = global.Promise;

//  serve static files from public folder (our front-end)
app.use(express.static('public'));

//  using bodyparser to parse the data
app.use(bodyparser.json());

//  initialize routes using midlleware
app.use('/api', routes);

//  error handling middleware
app.use((error, req, res, next) => {
    res.status(422).send({error: error.message});
})

//  listen for requests
app.listen(port, () => {
    console.log(`Server started on port 4000`);
});