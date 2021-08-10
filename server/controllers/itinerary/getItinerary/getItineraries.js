const { response } = require("../itineraryModule");
const itineraryRepository = require("../../../repositories/itineraryRepository");

const getItineraries = async (req, res = response) => {
  try {
    const itinerariesDB = await itineraryRepository.getAll();

    if (!itinerariesDB) {
      return res.status(401).json({
        ok: false,
        message: "",
        response: [],
      });
    }

    res.status(200).json({
      ok: true,
      message: "Itineraries",
      response: itinerariesDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  getItineraries,
};
