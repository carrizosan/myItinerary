const { Router } = require("../controllers/itinerary/itineraryModule");
const router = new Router();
const { get, create } = require("../controllers/itinerary/itineraryController");

router.get("/itineraries", get.getItineraries);

router.post("/itineraries", create.create);

module.exports = router;
