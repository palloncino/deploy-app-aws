require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileupload = require('express-fileupload')
const { /* getBaseUrls, */ authenticateJWT } = require("./utils/getEnvBaseUrls");
const { handleGetFields, handleEditField } = require("./controllers/portfolio");
const { handleGetPosts, handlePostPost } = require("./controllers/posts");
const {
  handleSignUp,
  handleSignIn,
  handleEmailCheckExistance,
  isAuthorized,
  isEmailVerified,
  handleVerificationLink,
  handleDeleteAccount,
  handleUploadImage,
} = require("./controllers/auth");
const {
  handlePostExpense,
  handleGetExpenses,
  handleDeleteExpense,
} = require("./controllers/expenses");

// const baseUrls = getBaseUrls();
const app = express();

// +------------------------------------------------+
// |  MIDDLEWARES                                   |
// +------------------------------------------------+
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

// +------------------------------------------------+
// |  APIS                                          |
// +------------------------------------------------+
// PORTFOLIO FORM
app.get("/api/portfolio/get-fields", handleGetFields);
app.post("/api/portfolio/edit-field", authenticateJWT, handleEditField);
// POSTS FORM
app.get("/api/posts/get-posts", handleGetPosts);
app.post("/api/posts/post-post", authenticateJWT, handlePostPost);
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
app.post("/auth/uploadImage", authenticateJWT, handleUploadImage);
// REDIRECT
// app.get("/", (req, res) => res.redirect(`${baseUrls.ENV_CLIENT_URL}`));
// PING
app.get("/", (req, res) => res.send(ok));
// 404
app.use(function (error, req, res, next) {
  res.status(error.status || 500).json({ error });
});

app.listen(process.env.PORT);
