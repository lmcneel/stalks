const router = require('express').Router();
const petsController = require('../../controllers/pets_controller.js');

// router.get('/oz', (req,res)=> res.send('hi oz'))
// router.route('ozair')
// .get(petsController.findAll)


router.get('/ozairishere', (req,res) => res.send('hi buddy'))



//matches with /api/pets/foodandtoys
//gets all the food and toys in the store
router.route('/storefoodandtoys')
.get(petsController.getstorefoodandtoy)

//matches with /api/pets/accessories
//gets all the food and toys in the store
router.route('/storeaccessories')
.get(petsController.getstoreaccessories)

//matches with /api/pets/accessories
//gets all the food and toys in the store
router.route('/useraccessories/:id')
.get(petsController.getuseraccessories)

//matches with /api/pets/accessories
//gets all the food and toys in the store
router.route('/userfoodandtoys/:id')
.get(petsController.getuserfoodandtoys)

router.route('/:id')
.post(petsController.update)
.get(petsController.findById)

module.exports = router;
