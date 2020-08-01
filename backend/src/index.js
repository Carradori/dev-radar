const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const http = require("http");

const { setupWebsocket } = require("./websocket");

//init the app
const app = express();
const server = http.Server(app);

setupWebsocket(server);

//init the database
mongoose.connect("mongodb://localhost:27017/week10", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3334);
