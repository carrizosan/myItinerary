const userRepository = require("../../../repositories/userRepository");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("../userModule");
const { SECRET_KEY } = require("../../../config/keys");

/**
 * User Sign In
 * Request body: email, password
 * @returns Status 200: Success, response: token and user info
 * @returns Status 401: Unauthorized: invalid user or password
 * @returns Status 500: Internal server error
 */
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Validate if user exists
    const userDB = await userRepository.getUserByEmail(email);

    if (!userDB) {
      return res.status(401).json({
        success: false,
        message: "Username or password is invalid",
      });
    }

    // Validate user password
    const comparePassword = await bCrypt.compare(password, userDB.password);

    if (comparePassword) {
      const options = { expiresIn: 2592000 };
      const payload = { id: userDB._id, username: userDB.mail, avatarPicture: userDB.userPic };

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
          res.status(200).json({
            success: true,
            response: {
              message: "Logged In",
              token,
              firstName: userDB.firstName,
              userPic: userDB.userPic,
            },
          });
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Username or password is invalid",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

/**
 * User re-validates the saved token
 * Request: user object
 * @returns Status 200: Success, response: token and user info
 * @returns Status 401: Unauthorized: invalid user
 * @returns Status 500: Internal server error
 */
const loginLocalStorage = async (req, res = response) => {
  const { mail } = req.user;

  try {
    // Validate if user exists
    const userDB = await userRepository.getUserByEmail(mail);
    if (!userDB) {
      return res.status(401).json({
        success: false,
        message: "Username or password is invalid",
      });
    }

    const options = { expiresIn: 2592000 };
    const payload = {
      id: userDB._id,
      username: userDB.mail,
      avatarPicture: userDB.userPic,
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
        res.status(200).json({
          success: true,
          response: {
            message: "Logged In",
            token,
            firstName: userDB.firstName,
            userPic: userDB.userPic,
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

module.exports = { login, loginLocalStorage };
