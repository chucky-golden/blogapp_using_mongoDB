const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const basicRoutes = require('./routes/basicroutes')
const blogRoutes = require('./routes/blogroutes')
const bodyParser = require('body-parser');


const app = express()

// connect to mongoDB
const dbURI = process.env.DBURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db')
        // listen for request only after database has connected
        const port = process.env.PORT;
        app.listen(port)
    })
    .catch((err) => {
        console.log(err)
    })

// register view engine
app.set('view engine', 'ejs')
// if you want to change default location for your ejs you can use config below
// app.set('views', 'folder name');

// middleware for static files
app.use(express.static('public'))
// middleware to process form datas
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// basic routes
app.use('/', basicRoutes)

// blog routes
app.use('/blogs', blogRoutes)

// 404 route
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})