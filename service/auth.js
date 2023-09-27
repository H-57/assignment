
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secrateKey = process.env.Jwt_Skey;

const setUser = (User) => {
  const {user_id,user_name,user_email}=User
  const token=jwt.sign({user_id,user_name,user_email}, secrateKey, { expiresIn: "12h" })
  return token
};

const getUser = (token) => {
  try {
    const auth= jwt.verify(token, secrateKey)
    return auth
  } catch (error) {
    // console.log(error)
    return false
  }
  
}
module.exports = {
  getUser,
  setUser,
};
