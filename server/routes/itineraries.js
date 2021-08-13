const { Router } = require("../controllers/itinerary/itineraryModule");
const router = new Router();
const passport = require("passport");
const { get, create, comments } = require("../controllers/itinerary/itineraryController");

// Get
router.get("/itineraries", get.getItineraries);
router.get("/itineraries/:id", get.getItinerariesByCityId);
router.get("/checkuser/:id", passport.authenticate("jwt", { session: false }), comments.getUserCommentsByItinerary);
router.get("/like/:id", passport.authenticate("jwt", { session: false }), get.likeItinerary);

// Create
router.post("/itineraries", passport.authenticate("jwt", { session: false }), create.create);

// Update
router.post("/comments/:id", passport.authenticate("jwt", { session: false }), comments.addUserComment);
router.put("/comment/:id", passport.authenticate("jwt", { session: false }), comments.updateComment);

// Delete
router.delete("/comment/:id/", passport.authenticate("jwt", { session: false }), comments.deleteComment);

module.exports = router;
