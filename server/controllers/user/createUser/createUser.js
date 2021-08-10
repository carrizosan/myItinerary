const { User, response } = require("../userModule");
const userRepository = require("../../../repositories/userRepository");

const create = async (req, res = response) => {
  const { firstName, lastName, mail, password, userPic, country } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      mail,
      password,
      userPic,
      country,
    });

    await userRepository.create(newUser);

    return res.status(201).json({
      ok: true,
      message: "User created",
      response: newUser,
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
