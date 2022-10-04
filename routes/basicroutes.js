const router = require('express').Router()
const basicController = require('../controllers/basiccontroller')

router.get('', basicController.index)
router.get('/about', basicController.about)
router.get('/contact', basicController.contact)


module.exports = router