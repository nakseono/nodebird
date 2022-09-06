const passport = requrie("passport");
const local = require("./local");

module.exports = () => {
  passport.serializeUser(() => {});

  passport.deserializeUser(() => {});

  local(); // ./local/index.js 의 module.exports 가 실행되는 것.
};
