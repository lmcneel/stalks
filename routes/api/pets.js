const router = require('express').Router();
const petsController = require('../../controllers/pets_controller.js');

// router.get('/oz', (req,res)=> res.send('hi oz'))
// router.route('ozair')
// .get(petsController.findAll)

router.route('/:id')
.post(petsController.update)
.get(petsController.findById)

router.route('/ozairishere')
.get(petsController.findAll)

module.exports = router;
