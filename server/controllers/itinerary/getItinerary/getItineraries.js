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

const getItineraryById = async (req, res = response) => {
  try {
    const itineraryDB = await itineraryRepository.getOne(req.params.id);

    if (!itineraryDB) {
      return res.status(404).json({
        ok: false,
        message: "Not found",
        response: [],
      });
    }

    res.status(200).json({
      ok: true,
      message: "Itinerary",
      response: itineraryDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

const getItinerariesByCityId = async (req, res = response) => {
  const { id } = req.params;
  try {
    const itinerariesDB = await itineraryRepository.getByCityId(id);

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
  getItineraryById,
  getItinerariesByCityId,
};
