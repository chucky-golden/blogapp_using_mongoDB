const Blog = require('../models/blog')

const index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }).limit(3) // sort from newest to oldest
        .then((result) => {
            res.render('index', { title: 'Home', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

const about = (req, res) => {
    res.render('about', { title: 'About' })
}

const contact = (req, res) => {
    res.render('contact', { title: 'Contact' })
}

module.exports = {
    index,
    about,
    contact
}