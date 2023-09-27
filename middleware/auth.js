const { getUser } = require("../service/auth");

async function restrictToLoggenInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);
  if (user==false) return res.redirect("/login");
  req.user = user;
  next();
}
module.exports={restrictToLoggenInUserOnly}