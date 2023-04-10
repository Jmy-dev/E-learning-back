"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.me = exports.getUser = exports.getAllStudents = exports.getAllDoctors = exports.deleteUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user2 = require("./user.model");
var _course = require("../course/course.model");
var _register = require("../../validation/register");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _department = require("../department/department.model");
var me = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var me;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user2.User.findById(req.user._id).populate('courses').populate('department').lean().exec();
        case 2:
          me = _context.sent;
          console.log(me);
          res.status(200).json({
            me: me
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function me(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.me = me;
var getAllStudents = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var students;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _user2.User.find({
            isAdmin: false,
            isDoctor: false
          }).lean().exec();
        case 3:
          students = _context2.sent;
          if (!(!students || students.length == 0)) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "There is no students !!"
          }));
        case 6:
          return _context2.abrupt("return", res.status(200).json({
            students: students
          }));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(400).end();
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getAllStudents(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllStudents = getAllStudents;
var getAllDoctors = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var doctors;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _user2.User.find({
            isDoctor: true
          }).lean().exec();
        case 3:
          doctors = _context3.sent;
          if (!(!doctors || doctors.length == 0)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: "There is no doctors !!"
          }));
        case 6:
          return _context3.abrupt("return", res.status(200).json({
            doctors: doctors
          }));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(400).end();
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getAllDoctors(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllDoctors = getAllDoctors;
var getUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _user2.User.findOne({
            _id: req.params.id
          }).populate('department').populate('courses').lean().exec();
        case 3:
          user = _context4.sent;
          if (user) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(400).end());
        case 6:
          return _context4.abrupt("return", res.status(200).json({
            data: user
          }));
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(400).end());
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function getUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getUser = getUser;
var updateUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var ownerId, executerId, user, department, updatedDepartment, _user, course, updatedCourse, updatedUser;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!(req.body.name || req.body.loginId)) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", res.status(400).end());
        case 3:
          ownerId = req.params.id; //EXECUTER 
          executerId = req.user._id;
          if (!(ownerId == executerId || req.user.isAdmin)) {
            _context5.next = 46;
            break;
          }
          if (!req.body.department) {
            _context5.next = 23;
            break;
          }
          _context5.next = 9;
          return _user2.User.findById(req.params.id).lean().exec();
        case 9:
          user = _context5.sent;
          if (user) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "there is no such a user"
          }));
        case 12:
          _context5.next = 14;
          return _department.Department.findById(req.body.department).exec();
        case 14:
          department = _context5.sent;
          if (department) {
            _context5.next = 17;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "Department error!!"
          }));
        case 17:
          if (department.users.includes(ownerId)) {
            _context5.next = 23;
            break;
          }
          _context5.next = 20;
          return _department.Department.updateOne({
            _id: department._id
          }, {
            $push: {
              users: ownerId
            }
          }, {
            "new": true
          });
        case 20:
          updatedDepartment = _context5.sent;
          if (updatedDepartment) {
            _context5.next = 23;
            break;
          }
          return _context5.abrupt("return", res.status(400));
        case 23:
          if (!req.body.courses) {
            _context5.next = 40;
            break;
          }
          _context5.next = 26;
          return _user2.User.findById(req.params.id).lean().exec();
        case 26:
          _user = _context5.sent;
          if (_user) {
            _context5.next = 29;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "there is no such a user"
          }));
        case 29:
          _context5.next = 31;
          return _course.Course.findById(req.body.courses).exec();
        case 31:
          course = _context5.sent;
          if (course) {
            _context5.next = 34;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "course error!!"
          }));
        case 34:
          if (course.users.includes(ownerId)) {
            _context5.next = 40;
            break;
          }
          _context5.next = 37;
          return _course.Course.updateOne({
            _id: course._id
          }, {
            $push: {
              users: ownerId
            }
          }, {
            "new": true
          });
        case 37:
          updatedCourse = _context5.sent;
          if (updatedCourse) {
            _context5.next = 40;
            break;
          }
          return _context5.abrupt("return", res.status(400));
        case 40:
          _context5.next = 42;
          return _user2.User.findOneAndUpdate({
            _id: req.params.id
          }, req.body, {
            "new": true
          }).exec();
        case 42:
          updatedUser = _context5.sent;
          if (updatedUser) {
            _context5.next = 45;
            break;
          }
          return _context5.abrupt("return", res.status(400).end());
        case 45:
          return _context5.abrupt("return", res.status(201).json({
            updatedUser: updatedUser
          }));
        case 46:
          return _context5.abrupt("return", res.status(401).json({
            error: 'you are not authorized!!'
          }));
        case 49:
          _context5.prev = 49;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(400).end();
        case 53:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 49]]);
  }));
  return function updateUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateUser = updateUser;
var deleteUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user, deletedUser;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (!req.user.isAdmin) {
            _context6.next = 13;
            break;
          }
          _context6.next = 4;
          return _user2.User.findById(req.params.id).lean().exec();
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).end());
        case 7:
          _context6.next = 9;
          return _user2.User.findOneAndDelete({
            _id: req.params.id
          });
        case 9:
          deletedUser = _context6.sent;
          if (deletedUser) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", res.status(400).end());
        case 12:
          return _context6.abrupt("return", res.status(200).json({
            msg: 'deleted!'
          }));
        case 13:
          return _context6.abrupt("return", res.status(401).json({
            error: "You are not Authorized to perform such an action"
          }));
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(400).end();
        case 20:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 16]]);
  }));
  return function deleteUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteUser = deleteUser;