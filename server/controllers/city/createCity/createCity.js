const { City, response } = require("../cityModule");
const cityRepository = require("../../../repositories/cityRepository");

const create = async (req, res = response) => {
  const { name, country, img } = req.body;

  const newCity = new City({ name, country, img });

  try {
    // Validate duplicated city name
    const cityDB = await cityRepository.getCityByQuery(name);

    if (cityDB.length) {
      return res.status(400).json({
        ok: false,
        message: "Duplicated record",
        name,
      });
    }

    // Create new city
    await cityRepository.create(newCity);
    return res.status(201).json({
      ok: true,
      message: "City created",
      city: newCity,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: "Bad request",
      error,
    });
  }
};

module.exports = { create };
