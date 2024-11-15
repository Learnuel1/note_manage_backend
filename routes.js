const { login } = require("./auth.controller");
const { createUser, getAccounts, updateAccount, getAccountByID, deleteAccount, createNote, getNoteByTitle, getNotes } = require("./handlers");
const { APIError } = require("./models/apiError");

const router = require("express").Router();
router.post("/account", createUser);
router.get("/account", getAccounts);
router.put("/account", updateAccount);
router.get("/account_id", getAccountByID)
router.delete("/account", deleteAccount)
router.post("/note", createNote);
router.get("/note", getNotes)
router.get("/note/id", getNoteByTitle).post("/auth/login", login)

router.use("*",  APIError.notFound)
module.exports = router;