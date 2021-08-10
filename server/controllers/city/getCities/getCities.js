const { response } = require("../cityModule");
const cityRepository = require("../../../repositories/cityRepository");

const getCities = async (req, res = response) => {
  const { name } = req.query;
  let citiesDB;
  let total = 0;
  try {
    if (name) {
      citiesDB = await cityRepository.getCityByQuery(name);
    } else {
      citiesDB = await cityRepository.getAll();
      total = await cityRepository.count();
    }

    if (!citiesDB) {
      return res.status(401).json({
        ok: false,
        message: "",
        response: [],
      });
    }

    res.status(200).json({
      ok: true,
      message: "Cities",
      response: citiesDB,
      total,
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
  getCities,
  // getCityByQuery,
};
