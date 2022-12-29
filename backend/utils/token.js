const jwt = require("jsonwebtoken");

const GenerateToken = (user) => {
  //Access Token
  const access_token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  //Refresh token
  const refresh_token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    }
  );

  //Reset token
  const reset_token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { access_token, refresh_token, reset_token };
};

module.exports = { GenerateToken };
