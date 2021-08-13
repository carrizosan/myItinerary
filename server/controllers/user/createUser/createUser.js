const userRepository = require("../../../repositories/userRepository");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, response } = require("../userModule");
const { SECRET_KEY } = require("../../../config/keys");
const { validationResult } = require("express-validator");

/**
 * Sign Up User and generates Sign In token
 * Validates request body by middleware response.
 * @returns Status 200: Success, response: User info and token
 * @returns Status 400: Validation errors / Email already registered
 * @returns Status 500: Internal server error
 */
const create = async (req, res = response) => {
  const { firstName, lastName, email: mail, password, userPic, country } = req.body;

  try {
    // Custom validation
    const validations = validationResult(req);

    if (!validations.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validations errors",
        error: validations.array(),
      });
    }

    // Validate duplicated email
    let userDB = await userRepository.getUserByEmail(mail);

    if (userDB) {
      return res.status(400).json({
        success: false,
        message: "User email already registered",
        response: mail,
      });
    }

    // Create and save new user
    const newUser = new User({
      firstName,
      lastName,
      mail,
      password: bCrypt.hashSync(password, 10),
      userPic,
      country,
    });

    const savedObj = await userRepository.create(newUser);

    const options = { expiresIn: 2592000 };
    const payload = {
      id: savedObj._id,
      username: savedObj.mail,
      avatarPicture: savedObj.userPic,
    };

    // Signs token and send it
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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = { create };
