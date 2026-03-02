import express from "express"
import mongoose from "mongoose"

const app = express();
import identify from "./router.js"

const port = 5000
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Connection Error:", err);
  });
app.use("/api",identify) 

app.listen(port, () => {
    console.log("server is running on ",port);
})