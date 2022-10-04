const router = require('express').Router()
const blogController = require('../controllers/blogcontroller')
const upload = require("../middlewares/upload");


router.get('/news', blogController.blog_index)
router.post('/addnew', upload.single("file"), blogController.blog_create_post)
router.get('/create', blogController.blog_create_get)
router.get('/single/:id', blogController.blog_details)
router.delete('/delete/:id', blogController.blog_delete)


module.exports = router