const { response } = require("../userModule");
const userRepository = require("../../../repositories/userRepository");

const getUsers = async (req, res = response) => {
  try {
    const usersDB = await userRepository.getAll();

    if (!usersDB) {
      return res.status(401).json({
        ok: false,
        message: "",
        users: [],
      });
    }

    res.status(200).json({
      ok: true,
      message: "Users",
      users: usersDB,
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
  getUsers,
};
