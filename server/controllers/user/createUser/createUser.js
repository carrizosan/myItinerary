const { User, response } = require("../userModule");
const userRepository = require("../../../repositories/userRepository");
const bCrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const create = async (req, res = response) => {
  const { firstName, lastName, mail, password, userPic, country } = req.body;

  try {
    // Custom validation
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({
        ok: false,
        msg: "Validations errors",
        error: validations.array(),
      });
    }

    // Validate duplicated records
    const userDB = await userRepository.getUserByEmail(mail);

    if (userDB.length) {
      return res.status(400).json({
        ok: false,
        message: "User email already registered",
        response: mail,
      });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      mail,
      password: bCrypt.hashSync(password, 10),
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
