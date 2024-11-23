const { login, logout, refreshToken } = require("./auth.controller");
const { createUser, getAccounts, updateAccount, getAccountByID, deleteAccount, createNote, getNoteByTitle, getNotes } = require("./handlers");
const { userRequired } = require("./middleware/auth.middleware");
const { APIError } = require("./models/apiError");

const router = require("express").Router();
router.post("/account", createUser);
router.get("/account", userRequired, getAccounts);
router.put("/account", updateAccount);
router.get("/account_id", getAccountByID)
router.delete("/account", deleteAccount)
router.post("/note", userRequired, createNote);
router.get("/note", getNotes)
router.get("/note/id", getNoteByTitle).post("/auth/login", login).post("/auth/logout", userRequired, logout).post("/auth/refreshtoken", refreshToken)

router.use("*",  APIError.notFound)
module.exports = router;