const jwt = require("jsonwebtoken");

exports.createJsonToken = async (payload, expired) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: expired,
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

exports.createReFreshToken = async (payload, expired) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: expired,
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};
