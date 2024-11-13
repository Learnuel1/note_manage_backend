const { connect } = require("mongoose");
const app = require("./app");
const router = require("./routes");
const dotenv = require("dotenv");
dotenv.config();
app.use("/api/v1", router)
app.use((err, req, res, next) => {
 res.status(err.status || 500).json({error: err.message})
})
app.listen(process.env.PORT, ()=>{
  try {
    console.log("Connecting to database ...");
    // connect to database
    // connect("mongodb://localhost:27017/note_db");
    connect(process.env.DB_URL);
    console.log("Database connected successfully ...");
    console.log(`Server is running on: http://localhost:${PORT}`)
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
})
 