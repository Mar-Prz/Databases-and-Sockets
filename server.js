let express = require("express");
let app = express();
let cors = require("cors");
let projectCollection;
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/projects", projectRoutes);

app.get("/addTwoNumbers/:firstNumber/:secondNumber", function (req, res, next) {
  let firstNumber = parseInt(req.params.firstNumber);
  let secondNumber = parseInt(req.params.secondNumber);
  let result = firstNumber + secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

let port = process.env.port || 3000;

http.listen(port, () => {
  console.log("Listening on: " + port);
  //createColllection('Pets')
});
