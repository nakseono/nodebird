const passport = requrie("passport");
const local = require("./local");
const { User } = require("./models");

module.exports = () => {
  passport.serializeUser((user, done) => { // 세션을 만들어주는 부분이다. cookie와 user.id를 연결해준다고 생각하면 될듯.
    done(user.id);
  });

  passport.deserializeUser(async (id, done) => { // 로그인을 성공한 후 그 다음 요청부터 매번 실행이 되어서, id로부터 사용자 정보를 복구해내고 req.user로 보내준다.
    try {
      const user = await User.findOne({
        where: { id: id },
      });

      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local(); // ./local/index.js 의 module.exports 가 실행되는 것.
};
