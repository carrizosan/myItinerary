const userRepository = require("../../../repositories/userRepository");
const { response } = require("../userModule");

/**
 * Get All Users
 * @returns Status 200: Success, response: users array
 * @returns Status 400: No users found, response: empty array
 * @returns Status 500: Internal server error
 */
const getUsers = async (req, res = response) => {
  try {
    const usersDB = await userRepository.getAll();

    if (!usersDB) {
      return res.status(400).json({
        success: false,
        message: "",
        response: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Users",
      response: usersDB,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  getUsers,
};
