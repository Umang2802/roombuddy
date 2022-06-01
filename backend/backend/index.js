const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const User = require('./models/user');

const roomRoutes = require('./routes/roomRoutes')
const userRoutes = require('./routes/userRoutes')


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb+srv://parth25:Comp2570@roombuddy.j50dr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser : true})
.then(() => {
    console.log("Mongo Connection open !");
})
.catch(err => {
    console.log("Oh no Mongo error");

});

app.use('/', userRoutes);
app.use('/rooms',roomRoutes);

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
