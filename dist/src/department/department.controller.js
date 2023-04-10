"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDepartment = exports.getDepartmentUsers = exports.getDepartment = exports.getAllDepartments = exports.getAllDepartmentCourses = exports.deleteDepartment = exports.createDepartment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _department = require("./department.model");
var _user = require("../user/user.model");
var _course = require("../course/course.model");
var _department2 = require("../../validation/department");
var getDepartment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var department;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _department.Department.findById(req.params.id).populate('users').populate('courses').lean().exec();
        case 3:
          department = _context.sent;
          if (!department) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            department: department
          }));
        case 6:
          return _context.abrupt("return", res.status(400).end());
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(400).end();
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getDepartment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getDepartment = getDepartment;
var createDepartment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$validateDepart, errors, isValid, department;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _department2.validateDepartmentInput)(req.body);
        case 3:
          _yield$validateDepart = _context2.sent;
          errors = _yield$validateDepart.errors;
          isValid = _yield$validateDepart.isValid;
          if (isValid) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            errors: errors
          }));
        case 8:
          _context2.next = 10;
          return _department.Department.create(req.body);
        case 10:
          department = _context2.sent;
          if (!department) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("return", res.status(201).json({
            department: department
          }));
        case 13:
          return _context2.abrupt("return", res.status(400).end());
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(400).end();
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function createDepartment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createDepartment = createDepartment;
var updateDepartment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var updatedDepartment;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (!req.user.isAdmin) {
            _context3.next = 8;
            break;
          }
          _context3.next = 4;
          return _department.Department.findByIdAndUpdate({
            _id: req.params.id
          }, req.body, {
            "new": true
          }).lean().exec();
        case 4:
          updatedDepartment = _context3.sent;
          if (!updatedDepartment) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(201).json({
            updatedDepartment: updatedDepartment
          }));
        case 7:
          return _context3.abrupt("return", res.status(400).end());
        case 8:
          return _context3.abrupt("return", res.status(401).json({
            error: "You are not authorized to perform such an action"
          }));
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          res.status(400).end();
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function updateDepartment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.updateDepartment = updateDepartment;
var deleteDepartment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var department, index, user, course, _deleteDepartment;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (!req.user.isAdmin) {
            _context4.next = 28;
            break;
          }
          _context4.next = 4;
          return _department.Department.findById(req.params.id).lean().exec();
        case 4:
          department = _context4.sent;
          if (department) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: "there is no such department!"
          }));
        case 7:
          index = 0;
        case 8:
          if (!(index < department.users.length)) {
            _context4.next = 22;
            break;
          }
          _context4.next = 11;
          return _user.User.findByIdAndUpdate({
            _id: department.users[index]
          }, {
            $unset: {
              department: department._id
            }
          }, {
            "new": true
          });
        case 11:
          user = _context4.sent;
          _context4.next = 14;
          return _course.Course.findByIdAndUpdate({
            _id: department.courses[index]
          }, {
            $unset: {
              department: department._id
            }
          }, {
            "new": true
          });
        case 14:
          course = _context4.sent;
          if (user) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            msg: "department error!!  "
          }));
        case 17:
          if (course) {
            _context4.next = 19;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            msg: "course error!!"
          }));
        case 19:
          index++;
          _context4.next = 8;
          break;
        case 22:
          _context4.next = 24;
          return _department.Department.findByIdAndDelete(req.params.id);
        case 24:
          _deleteDepartment = _context4.sent;
          if (!_deleteDepartment) {
            _context4.next = 27;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            msg: "Department Deleted"
          }));
        case 27:
          return _context4.abrupt("return", res.status(400).end());
        case 28:
          return _context4.abrupt("return", res.status(401).json({
            error: "You are not authorized to perform such an action!"
          }));
        case 31:
          _context4.prev = 31;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(400).end();
        case 35:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 31]]);
  }));
  return function deleteDepartment(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteDepartment = deleteDepartment;
var getAllDepartments = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var departments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _department.Department.find({}).populate('courses', 'users').lean().exec();
        case 3:
          departments = _context5.sent;
          if (!(departments.length == 0)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            msg: "There is no departments yet !"
          }));
        case 6:
          if (!departments) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            departments: departments
          }));
        case 8:
          return _context5.abrupt("return", res.status(400).end());
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(400).end();
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function getAllDepartments(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getAllDepartments = getAllDepartments;
var getDepartmentUsers = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _department.Department.findById(req.params.id).select('users').populate('users').lean().exec();
        case 3:
          users = _context6.sent;
          if (!users) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            users: users
          }));
        case 6:
          res.status(400).end();
          _context6.next = 13;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(400).end();
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function getDepartmentUsers(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getDepartmentUsers = getDepartmentUsers;
var getAllDepartmentCourses = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var courses;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _department.Department.findById(req.params.id).select('courses').populate('courses').lean().exec();
        case 3:
          courses = _context7.sent;
          if (courses) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", res.status(400).end());
        case 6:
          return _context7.abrupt("return", res.status(200).json({
            courses: courses
          }));
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(400).end();
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function getAllDepartmentCourses(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getAllDepartmentCourses = getAllDepartmentCourses;