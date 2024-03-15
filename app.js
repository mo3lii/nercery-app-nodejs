const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const childRouter = require("./Route/childRouter");
const calssRouter = require("./Route/classRouter");
const teacherRouter = require("./Route/teacherRouter");
const loginRouter = require("./Route/authenticationRouter");
const authenticationMW = require("./MW/auth/authenticationMW");
//create server
const server = express();
mongoose
  .connect("mongodb://localhost:27017/nercery")
  .then(() => {
    console.log("DB connected...");
    server.listen(8080, () => {
      console.log(" server start lestining . .. ");
    });
  })
  .catch((error) => {
    console.log(error + " DB problem..");
  });

//first MiddleWare  -- logging requests

server.use(morgan("tiny")); //morgan(':method :url :status :res[content-length] - :response-time ms')

server.use(cors());

// settings
server.use(express.json());

// routers
server.use(loginRouter);
server.use(authenticationMW);
server.use(childRouter);
server.use(calssRouter);
server.use(teacherRouter);

// not found
server.use((req, res, next) => {
  res.status(404).json({ error: "not found" });
  console.log("hello from not found MW");
});

//error MW

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ data: "error : " + err.message });
});
