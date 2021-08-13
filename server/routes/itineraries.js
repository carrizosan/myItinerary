const { Router } = require("../controllers/itinerary/itineraryModule");
const router = new Router();
const passport = require("passport");
const { get, create, actions } = require("../controllers/itinerary/itineraryController");
const { itineraryValidation } = require("../validations/itinerary");

// Get
router.get("/itineraries", get.getItineraries);
router.get("/itineraries/:id", get.getItinerariesByCityId);
router.get("/checkuser/:id", passport.authenticate("jwt", { session: false }), actions.getUserCommentsByItinerary);
router.get("/like/:id", passport.authenticate("jwt", { session: false }), actions.likeItinerary);

// Create
router.post("/itineraries", [passport.authenticate("jwt", { session: false }), itineraryValidation], create.create);

// Update
router.post("/comments/:id", passport.authenticate("jwt", { session: false }), actions.addUserComment);
router.put("/comment/:id", passport.authenticate("jwt", { session: false }), actions.updateComment);

// Delete
router.delete("/comment/:id/", passport.authenticate("jwt", { session: false }), actions.deleteComment);

module.exports = router;
