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
    exp= Math.floor(Date.now() / 1000) + ( 24 * 60 * 60)
    const token = jwt.sign({ userId: data.id }, secretKey, {
      expiresIn: "24h",
    });

    return {
      token,
      exp
    }
  };

  module.exports = { validateToken, createToken };