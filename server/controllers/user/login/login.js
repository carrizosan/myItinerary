const { response } = require("../userModule");
const userRepository = require("../../../repositories/userRepository");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../config/keys");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  console.log(req.user);
  try {
    // Validate if user exists
    const userDB = await userRepository.getUserByEmail(email);
    if (!userDB) {
      return res.status(401).json({
        ok: false,
        message: "Username or password is invalid",
      });
    }
    // Validate user password
    const comparePassword = await bCrypt.compare(password, userDB.password);
    if (comparePassword) {
      const payload = {
        id: userDB._id,
        username: userDB.mail,
        avatarPicture: userDB.userPic,
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
        ok: false,
        message: "Username or password is invalid",
      });
    }
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: "Bad request",
      error,
    });
  }
};

const loginLocalStorage = async (req, res = response) => {
  const { mail } = req.user;

  try {
    // Validate if user exists
    const userDB = await userRepository.getUserByEmail(mail);
    if (!userDB) {
      return res.status(401).json({
        ok: false,
        message: "Username or password is invalid",
      });
    }

    const payload = {
      id: userDB._id,
      username: userDB.mail,
      avatarPicture: userDB.userPic,
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
            message: "Logged In",
            token,
            firstName: userDB.firstName,
            userPic: userDB.userPic,
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

module.exports = { login, loginLocalStorage };
