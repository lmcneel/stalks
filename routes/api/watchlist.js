const router = require('express').Router();
const watchlistController = require('../../controllers/watchlistController');

// Matches with '/api/watchlist'
router.route('/')
  .get(watchlistController.findAll)
  .post(watchlistController.create);


// Matches with '/api/watchlist/:id'
router
  .route('/:id')
  .get(watchlistController.findById)
  .put(watchlistController.update)
  .delete(watchlistController.remove);

  module.exports = router;
