"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.me = exports.getUser = exports.deleteUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user2 = require("./user.model");
var _course = require("../course/course.model");
var _register = require("../../validation/register");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _department = require("../department/department.model");
var me = function me(req, res) {
  res.status(200).json({
    data: req.user
  });
};
exports.me = me;
var getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _user2.User.findOne({
            _id: req.params.id
          }).populate('department', 'course').lean().exec();
        case 3:
          user = _context.sent;
          if (user) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).end());
        case 6:
          return _context.abrupt("return", res.status(200).json({
            data: user
          }));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(400).end());
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUser = getUser;
var updateUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var ownerId, executerId, user, department, updatedDepartment, _user, course, updatedCourse, updatedUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (!(req.body.name || req.body.loginId)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).end());
        case 3:
          ownerId = req.params.id; //EXECUTER 
          executerId = req.user._id;
          if (!(ownerId == executerId || req.user.isAdmin)) {
            _context2.next = 38;
            break;
          }
          if (!req.body.department) {
            _context2.next = 19;
            break;
          }
          _context2.next = 9;
          return _user2.User.findById(req.params.id).lean().exec();
        case 9:
          user = _context2.sent;
          _context2.next = 12;
          return _department.Department.findById(req.body.department).exec();
        case 12:
          department = _context2.sent;
          if (department.users.includes(ownerId)) {
            _context2.next = 19;
            break;
          }
          _context2.next = 16;
          return _department.Department.updateOne({
            _id: department._id
          }, {
            $push: {
              users: ownerId
            }
          }, {
            "new": true
          });
        case 16:
          updatedDepartment = _context2.sent;
          if (updatedDepartment) {
            _context2.next = 19;
            break;
          }
          return _context2.abrupt("return", res.status(400));
        case 19:
          if (!req.body.courses) {
            _context2.next = 32;
            break;
          }
          _context2.next = 22;
          return _user2.User.findById(req.params.id).lean().exec();
        case 22:
          _user = _context2.sent;
          _context2.next = 25;
          return _course.Course.findById(req.body.courses).exec();
        case 25:
          course = _context2.sent;
          if (course.users.includes(ownerId)) {
            _context2.next = 32;
            break;
          }
          _context2.next = 29;
          return _course.Course.updateOne({
            _id: course._id
          }, {
            $push: {
              users: ownerId
            }
          }, {
            "new": true
          });
        case 29:
          updatedCourse = _context2.sent;
          if (updatedCourse) {
            _context2.next = 32;
            break;
          }
          return _context2.abrupt("return", res.status(400));
        case 32:
          _context2.next = 34;
          return _user2.User.findOneAndUpdate({
            _id: req.params.id
          }, req.body, {
            "new": true
          }).exec();
        case 34:
          updatedUser = _context2.sent;
          if (updatedUser) {
            _context2.next = 37;
            break;
          }
          return _context2.abrupt("return", res.status(400).end());
        case 37:
          return _context2.abrupt("return", res.status(201).json({
            updatedUser: updatedUser
          }));
        case 38:
          return _context2.abrupt("return", res.status(401).json({
            error: 'you are not authorized!!'
          }));
        case 41:
          _context2.prev = 41;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(400).end();
        case 45:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 41]]);
  }));
  return function updateUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateUser = updateUser;
var deleteUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, deletedUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (!req.user.isAdmin) {
            _context3.next = 13;
            break;
          }
          _context3.next = 4;
          return _user2.User.findById(req.params.id).lean().exec();
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).end());
        case 7:
          _context3.next = 9;
          return _user2.User.findOneAndDelete({
            _id: req.params.id
          });
        case 9:
          deletedUser = _context3.sent;
          if (deletedUser) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", res.status(400).end());
        case 12:
          return _context3.abrupt("return", res.status(200).json({
            msg: 'deleted!'
          }));
        case 13:
          return _context3.abrupt("return", res.status(401).json({
            error: "You are not Authorized to perform such an action"
          }));
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(400).end();
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return function deleteUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteUser = deleteUser;