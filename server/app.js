require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getBaseUrls, authenticateJWT } = require("./utils/getEnvBaseUrls");
const { handleGetFields, handleEditField } = require("./controllers/portfolio");
const {
  handleSignUp,
  handleSignIn,
  handleEmailCheckExistance,
  isAuthorized,
  isEmailVerified,
  handleVerificationLink,
  handleDeleteAccount,
} = require("./controllers/auth");
const {
  handlePostExpense,
  handleGetExpenses,
  handleDeleteExpense,
} = require("./controllers/expenses");

const baseUrls = getBaseUrls();
const app = express();

// +------------------------------------------------+
// |  MIDDLEWARES                                   |
// +------------------------------------------------+
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// +------------------------------------------------+
// |  APIS                                          |
// +------------------------------------------------+
// PORTFOLIO FORM
app.get("/api/portfolio/get-fields", authenticateJWT, handleGetFields);
app.post("/api/portfolio/edit-field", authenticateJWT, handleEditField);
// EXPENSES FORM
app.post("/api/expenses/post-expense", authenticateJWT, handlePostExpense);
app.post("/api/expenses/delete-expense", authenticateJWT, handleDeleteExpense);
app.get("/api/expenses/get-expenses", authenticateJWT, handleGetExpenses);
// AUTHORIZATION
app.post("/auth/email-already-exists", handleEmailCheckExistance);
app.post("/auth/delete-account", authenticateJWT, handleDeleteAccount);
app.post("/auth/check-token-validity", authenticateJWT, isAuthorized);
app.post("/auth/check-email-verified", isEmailVerified);
app.post("/auth/sign-up", handleSignUp);
app.post("/auth/sign-in", handleSignIn);
app.get("/auth/verify_email", handleVerificationLink);
// REDIRECT
app.get("/", (req, res) => res.redirect(`${baseUrls.ENV_CLIENT_URL}`));
// 404
app.use(function (error, req, res, next) {
  res.status(error.status || 500).json({ err });
});

app.listen(process.env.PORT);
