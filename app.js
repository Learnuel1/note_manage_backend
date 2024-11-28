const express = require("express");
const app = express();
const cors = require("cors")
const whitelist = ['http://127.0.0.1:5500']

app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get("/api/v1/status", (req, res)=>{
  try { 
    res.status(200).json({message:" Yes! Welcome to our API"});
  } catch (error) {
    res.status(500).json({error})
  }
});
app.use((err, req, res, next) =>{
  res.status(err.status || 500).json({error: err.message});
});

module.exports = app;

