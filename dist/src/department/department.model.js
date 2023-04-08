"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Department = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var departmentSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  courses: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'course'
  }],
  users: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {
  timestamps: true
});
var Department = _mongoose["default"].model('department', departmentSchema);
exports.Department = Department;