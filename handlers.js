const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { getFileContent } = require("./utils");
const { APIError } = require("./models/apiError");
const AccountModel = require("./Account.model");
const { default: mongoose } = require("mongoose");
const NoteModel = require("./note.model");
const { hashSync } = require("bcryptjs");
exports.createUser = async (req, res, next) => {
  try {
    const {name, track, gender, email, password} = req.body;
    // data validation
    if(!email) return next(APIError.badRequest("Email is require"))
    if(!password) return next(APIError.badRequest("Password is require"));
    if (!name) return next(APIError.badRequest("Name is required"))
    if (!track) throw  new Error("Track is required");
    if (!gender) throw  new Error("Gender is required");
    if (gender !== 'male' && gender !== 'female')  throw new Error("Invalid gender");
    if(password.length <8) return next(APIError.badRequest("Invalid password length"));
    const hashedPassword = hashSync(password, 10);
    const newUser = {
      name,
      gender,
      track,
      email,
      password: hashedPassword,
      // createdAt,
      // updatedAt: createdAt,
      // id: uuidv4(),
    };
      const createAccount = await AccountModel.create({...newUser})
    // if(fs.existsSync("accounts.json")){
    //    fs.readFile("accounts.json", "utf-8", (err, data) => {
    //       if(err)  throw new Error(err);
    //       const existingUsers = JSON.parse(data);
    //     existingUsers.push(newUser);
    //     const result = fs.writeFileSync("accounts.json", JSON.stringify(existingUsers));
    //     if(result) throw new Error(result);
    //    })
    // }else{
    //   // create the file an write to it;
    //   const users = [newUser];
    //  const result = fs.writeFileSync("accounts.json", JSON.stringify(users));
    //  if(result) throw new Error(result);
    // }
    res.status(201).json({message: "Account created successfully"})
  } catch (error) {
    // res.status(400).json({error: error.message});
    next(error)
  }
}

exports.getAccounts = async (req, res, next) => {
  try {
    const accounts = await AccountModel.find({}).select("-__v");
    if(!accounts || accounts.length === 0) 
      return res.status(404).json({message: "No record found"});
    // if(fs.existsSync("accounts.json")){
    //   const users = fs.readFileSync("accounts.json", "utf-8");
    //   if(users.error) throw new Error(err);
    //   res.status(200).json({message: "Accounts found", accounts: JSON.parse(users)})
    // }else{
      //   res.status(404).json({message: "No record found"});
      // }
        res.status(200).json({message: "Accounts found", accounts})
  } catch (error) {
    next(error)
  }
}
exports.getAccountByID = async (req, res, next) => {
  try {
    const {id} = req.query; 
    if(!id) return next(APIError.badRequest("ID is required"));
    // const users = getFileContent("accounts.json");
    // if(users?.error) throw new Error(users.error);
    // const user = users.find(x => x.id === id);
    const user = await AccountModel.findById(id).select("-__v")
    if(!user)return next(APIError.badRequest("Account does not Exist"));
    res.status(200).json({message: "found", user});
  } catch (error) {
    next(error)
  }
}
 

exports.updateAccount = async (req, res, next) => {
  try {
    const { id} = req.body;
    if (!id) return next (APIError.badRequest("Account ID is required"));
    const info = {};
    delete req.body.id;
    for(let key in req.body){
      info[key] = req.body[key];
    }
    // const userExist = await AccountModel.findById({id})
    const userExist = await AccountModel.findByIdAndUpdate(id, {...info}, {returnOriginal:false})
    if(!userExist) return next(APIError.notFound("User does not Exist"))
    // check if file exist
    // if( fs.existsSync("accounts.json")){
    //     // read the file
    //     let allUsers = fs.readFileSync("accounts.json", "utf-8");
    //     if(allUsers.error) throw new Error(err);
    //     allUsers = JSON.parse(allUsers);

    //     // find a particular user to update
    //     const userExist = allUsers.find(user => user.id === id);
    //     if(!userExist) return res.status(404).json({message: "user does not exist"});
    //     for(let key in info){
    //       userExist[key] = info[key];
    //       userExist.updatedAt = Date.now();
    //     } 
    //     const otherUsers = allUsers.filter(user => user.id !== id);
    //     otherUsers.push(userExist);
    //     // write data back to file
    //     const result = fs.writeFileSync("accounts.json", JSON.stringify(otherUsers));
    //     if(result) throw new Error(result);
    //     res.status(200).json({message: "Account updated successfully"})
    // }else{
    //   res.status(404).json({message: "No record found"})
    // }
    res.status(200).json({message: "Account updated successfully"})
  } catch (error) {
    next(error)
  }
}

exports.deleteAccount = (req, res) => {
  try {
    const {id} = req.query;
    if(!id) throw new Error("ID is required");
    const users = getFileContent("accounts.json");
    if(users?.error) return res.status(400).json({error: users.error});
    const userExist = users.find( user => user.id === id);
    if(!userExist) throw new Error("Account does not exist");
    const others = users.filter(x => x.id !== id);
    const save = fs.writeFileSync("accounts.json", JSON.stringify(others));
    if(save) throw new Error(save);
    res.status(200).json({message: "Account deleted successfully"})
  } catch (error) {
    res.status(error.status || 400).json({error: error.message});
  }
}

exports.createNote = async (req, res, next) => {
  try {
    const {accountId, title, text} = req.body;
    if(!accountId) throw new Error("Account ID is require");
    if(!title) throw new Error("Title is require");
    if(!text) throw new Error("Text is require");
    const createdAt = Date.now;
    const newNote =  {
      accountId,
      title,
      text,
      account: accountId, 
    }
    const userExist = await AccountModel.findById(accountId);
    if(!userExist) return next(APIError.badRequest("Invalid Account ID"));
    const createNote = await NoteModel.create({...newNote});
  res.status(200).json({message: "Note created successfully"})
  } catch (error) {
    next(error)
  }
}
exports.getNotes = async (req, res, next) => {
  try{
    const notes = await NoteModel.find({}).select("-__v")
    if(!notes || notes.length === 0) return next(APIError.notFound("Note not found"))
    res.status(200).json({message: "Found", notes});
  } catch(error){
    next(error)
  }
}
exports.getNoteByTitle = async (req, res, next) => {
  try {
      const {search} = req.query;
       let query = search
      if(!search) query = "";
      const notes = await NoteModel.find({title:query}).populate("account").select("-__v");
      res.status(200).json({ message: "Found", notes});
  } catch (error) {
    next(error)
  }
}