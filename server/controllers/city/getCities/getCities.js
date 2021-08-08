const { response } = require("../cityModule");
const cityRepository = require("../../../repositories/cityRepository");

const getCities = async (req, res = response) => {
  const { name } = req.query;
  let citiesDB;

  try {
    if (name) {
      citiesDB = await cityRepository.getCityByQuery(name);
    } else {
      citiesDB = await cityRepository.getAll();
    }

    if (!citiesDB) {
      return res.status(401).json({
        ok: false,
        message: "",
        cities: [],
      });
    }

    res.status(200).json({
      ok: true,
      message: "Cities",
      cities: citiesDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

// const getCityByQuery = async (req, res = response) => {
//   const { name } = req.params;
//   console.log(name);
//   try {
//     const cityDB = await cityRepository.getCityByQuery(name);

//     if (!cityDB) {
//       return res.status(404).json({
//         ok: false,
//         message: "City not found",
//       });
//     }

//     return res.status(200).json({
//       ok: true,
//       message: "City",
//       city: cityDB,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       ok: false,
//       meessage: "Internal server error",
//       error,
//     });
//   }
// };

module.exports = {
  getCities,
  // getCityByQuery,
};
