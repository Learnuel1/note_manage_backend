const express = require("express");
const app = express();


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

