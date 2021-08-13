const { User, response } = require("../userModule");
const userRepository = require("../../../repositories/userRepository");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../config/keys");
const { validationResult } = require("express-validator");

const create = async (req, res = response) => {
  const { firstName, lastName, email: mail, password, userPic, country } = req.body;

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
    let userDB = await userRepository.getUserByEmail(mail);

    if (userDB) {
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

    const savedObj = await userRepository.create(newUser);

    const payload = {
      id: savedObj._id,
      username: savedObj.mail,
      avatarPicture: savedObj.userPic,
    };
    const options = { expiresIn: 2592000 };

    jwt.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) {
        res.status(500).json({
          success: false,
          response: {
            token: "",
            message: "There was an error",
          },
        });
      } else {
        res.json({
          success: true,
          response: {
            message: "Registered",
            token,
            firstName: savedObj.firstName,
            userPic: savedObj.userPic,
          },
        });
      }
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
