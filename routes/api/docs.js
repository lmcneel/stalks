const router = require('express').Router();
// const request = require('request');
const docsController = require("../../controllers/docsController");

// Matches with "/api/books"
router.route("/")
  .get(docsController.findAll)
  .post(docsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(docsController.findById)
  .put(docsController.update)
  .delete(docsController.remove);
module.exports = router;


