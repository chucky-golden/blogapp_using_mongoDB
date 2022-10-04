const Blog = require('../models/blog')
const cloudinary = require('../middlewares/upload')


const blog_index = async (req, res) => {
    const user = await Blog.find().sort({ createdAt: -1 }) // sort from newest to oldest
    if(user !== null){
        res.render('news', { title: 'All News', blogs: user })
    }else{
        res.redirect('/')
    }
}

const blog_details = async (req, res) => {
    const id = req.params.id
    const user = await Blog.findById(id)
    if(user !== null){
        res.render('single', { title: 'news', blog: user })
    }else{
        res.status(404).render('404', { title: '404' })
    }
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create' })
}

const blog_create_post = async (req, res) => {
    try{ 
        if (req.file == undefined) {
            res.render('create', { title: 'Create', message: 'You must select a file.' })
        }
        var d = new Date(); 
        var dt = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " "  
                + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        // create an objet from the request coming in
        let info = {
            title: req.body.title,
            snippet: req.body.snippet,
            img: req.file.filename,
            body: req.body.body,
            mytime: dt,
        }

        const blog = await new Blog(info).save()
        if(blog !== null){
            res.redirect('/blogs/news')
        }else{
            res.redirect('/blogs/create')
        }

    }catch (error) {
        console.log(error)
        res.redirect('/blogs/create')
    }
}

const blog_delete = async (req , res) => {
    const id = req.params.id
    
    const user = await Blog.findByIdAndDelete(id)

    if(user !== null){
        res.json({ redirect: '/blogs/news' })
    }else{
        res.json({ redirect: '/blogs/news' })
    }
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}