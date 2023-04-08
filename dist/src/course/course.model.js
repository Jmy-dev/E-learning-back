"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Course = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var courseSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'department'
  },
  users: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user'
  }],
  videosURL: [{
    type: String
  }],
  pdfLinks: [{
    type: String
  }],
  quizes: [{
    type: String
  }]
});
var Course = _mongoose["default"].model('course', courseSchema);
exports.Course = Course;