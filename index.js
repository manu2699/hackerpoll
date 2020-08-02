const express = require('express')
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const AdminRoutes = require("./routes/admin_routes/index");
app.use("/api/admin", AdminRoutes);

const UserRoutes = require("./routes/user_routes/index");
app.use("/api/user", UserRoutes);

mongoose.connect(`${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log("Connected to database");
  },
    (err) => {
      console.log("Connection Failed", err);
    }
  );

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const serveHost = process.env.YOUR_HOST || "0.0.0.0";

var server = app.listen(port, serveHost, () => {
  console.log(`Server running on ${port}`);
});

var io = require("socket.io")(server);
app.set("io", io);

io.on("connection", socket => {
  console.log("socket connected")
})