"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _dev = require("./config/dev");
var _user = _interopRequireDefault(require("./src/user/user.router"));
var _department = _interopRequireDefault(require("./src/department/department.router"));
var _course = _interopRequireDefault(require("./src/course/course.router"));
var _bodyParser = require("body-parser");
var _auth = require("./utils/auth");
// app setup 

var app = (0, _express["default"])();
var PORT = process.env.PORT || 8000;
app.use((0, _cors["default"])());

//body-parser setup
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _bodyParser.json)());
app.use((0, _morgan["default"])('dev'));

//routes
app.get('/', function (req, res) {
  res.send("Hello");
});
app.use('/login', _auth.signin);
app.use('/register', _auth.signup);
app.use('/api', _auth.protect);
app.use('/api/user', _user["default"]);
app.use('/api/department', _department["default"]);
app.use('/api/course', _course["default"]);
_mongoose["default"].connect(_dev.config.secrets.dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Mongodb is connected!!");
  app.listen(PORT, function () {
    console.log("server is runing on port ".concat(PORT));
  });
})["catch"](function (e) {
  return console.log(e);
});