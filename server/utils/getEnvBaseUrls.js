const jwt = require("jsonwebtoken");

function getBaseUrls() {
  const environment = `${process.env.WORKING_ENVIRONMENT}` ?? "production";

  if (environment === "development") {
    return {
      ENV_BASE_URL: `${process.env.LOCAL_BASE_URL}`,
      ENV_CLIENT_URL: `${process.env.LOCAL_CLIENT_URL}`,
    };
  } else {
    return {
      ENV_BASE_URL: `${process.env.BASE_URL}`,
      ENV_CLIENT_URL: `${process.env.CLIENT_URL}`,
    };
  }
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  getBaseUrls,
  authenticateJWT,
};