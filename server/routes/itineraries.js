const { Router } = require("../controllers/itinerary/itineraryModule");
const router = new Router();
const { get, create } = require("../controllers/itinerary/itineraryController");

router.get("/", get.getItineraries);

router.post("/", create.create);

module.exports = router;
