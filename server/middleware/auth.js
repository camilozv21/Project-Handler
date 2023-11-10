require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env["SESSION_SECRET"];

const validateToken = (req, res, next) => {
    try{
      const token = req.headers.authorization;
    
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          next();
        } else {
          req.user = decoded;
          next();
        }
      });
      
    }
    catch(error){
      console.error(error.message);
      next();
    }
  };

  const createToken = (data) => {
    return jwt.sign({ userId: data.id }, secretKey, {
      expiresIn: "1h",
    });
  };

  module.exports = { validateToken, createToken };