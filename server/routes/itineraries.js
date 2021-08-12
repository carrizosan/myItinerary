const { Router } = require("../controllers/itinerary/itineraryModule");
const router = new Router();
const { get, create } = require("../controllers/itinerary/itineraryController");
const passport = require("passport");

// Read
router.get("/itineraries", get.getItineraries);
router.get("/itinerary/:id", get.getItineraryById);
router.get("/itineraries/:id", get.getItinerariesByCityId);

// Create
router.post("/itineraries", passport.authenticate("jwt", { session: false }), create.create);

module.exports = router;
