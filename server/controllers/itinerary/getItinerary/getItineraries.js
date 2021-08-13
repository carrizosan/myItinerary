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

const likeItinerary = async (req, res = response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const userLiked = await itineraryRepository.getUserLiked(id, user._id);
    const action = userLiked ? "$pull" : "$push";
    const { likes } = (await itineraryRepository.getLikes(id)) || 0;
    const newLikes = userLiked ? likes - 1 : likes + 1;
    await itineraryRepository.addUserLike(id, user._id, action);
    const modifiedItinerary = await itineraryRepository.updateLikes(id, newLikes);

    if (modifiedItinerary) {
      return res.status(200).json({
        success: true,
        message: "Liked updated",
        response: {
          likes: newLikes,
          liked: !userLiked,
        },
      });
    }
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
      success: true,
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
  likeItinerary,
  getItinerariesByCityId,
};
