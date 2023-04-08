"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCourse = exports.getCourse = exports.getAllCourses = exports.deleteCourse = exports.createCourse = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _course4 = require("./course.model");
var _user = require("../user/user.model");
var _department = require("../department/department.model");
var _course5 = require("../../validation/course");
var getCourse = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var course;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _course4.Course.findById(req.params.id).lean().exec();
        case 3:
          course = _context.sent;
          if (course) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).end());
        case 6:
          return _context.abrupt("return", res.status(200).json({
            course: course
          }));
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
  return function getCourse(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getCourse = getCourse;
var getAllCourses = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var courses;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _course4.Course.find({}).populate('department').populate('users').lean().exec();
        case 3:
          courses = _context2.sent;
          if (!(courses.length == 0)) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            msg: "There is no courses yet !"
          }));
        case 6:
          if (courses) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(400).end());
        case 8:
          return _context2.abrupt("return", res.status(200).json({
            courses: courses
          }));
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(400).end();
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function getAllCourses(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAllCourses = getAllCourses;
var createCourse = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _yield$validateCourse, errors, isValid, course;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _course5.validateCourseInput)(req.body);
        case 3:
          _yield$validateCourse = _context3.sent;
          errors = _yield$validateCourse.errors;
          isValid = _yield$validateCourse.isValid;
          if (isValid) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            errors: errors
          }));
        case 8:
          _context3.next = 10;
          return _course4.Course.create(req.body);
        case 10:
          course = _context3.sent;
          if (course) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(400).end());
        case 13:
          return _context3.abrupt("return", res.status(201).json({
            course: course
          }));
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          res.status(400).end();
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return function createCourse(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.createCourse = createCourse;
var updateCourse = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var course, _updatedCourse, _course, _updatedCourse2, _course2, _updatedCourse3, _course3, department, updatedDepartment, body, updatedCourse;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (!req.user.isAdmin) {
            _context4.next = 54;
            break;
          }
          if (!req.body.videosURL) {
            _context4.next = 12;
            break;
          }
          _context4.next = 5;
          return _course4.Course.findById(req.params.id).exec();
        case 5:
          course = _context4.sent;
          if (course.videosURL.includes(req.body.videosURL)) {
            _context4.next = 12;
            break;
          }
          _context4.next = 9;
          return _course4.Course.findByIdAndUpdate({
            _id: req.params.id
          }, {
            $push: {
              videosURL: req.body.videosURL
            }
          }, {
            "new": true
          }).exec();
        case 9:
          _updatedCourse = _context4.sent;
          if (_updatedCourse) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(400));
        case 12:
          if (!req.body.pdfLinks) {
            _context4.next = 23;
            break;
          }
          _context4.next = 15;
          return _course4.Course.findById(req.params.id).exec();
        case 15:
          _course = _context4.sent;
          if (_course.pdfLinks.includes(req.body.pdfLinks)) {
            _context4.next = 23;
            break;
          }
          console.log("Hey!!");
          _context4.next = 20;
          return _course4.Course.findByIdAndUpdate({
            _id: req.params.id
          }, {
            $push: {
              pdfLinks: req.body.pdfLinks
            }
          }, {
            "new": true
          }).exec();
        case 20:
          _updatedCourse2 = _context4.sent;
          if (_updatedCourse2) {
            _context4.next = 23;
            break;
          }
          return _context4.abrupt("return", res.status(400));
        case 23:
          if (!req.body.quizes) {
            _context4.next = 34;
            break;
          }
          _context4.next = 26;
          return _course4.Course.findById(req.params.id).exec();
        case 26:
          _course2 = _context4.sent;
          if (_course2.quizes.includes(req.body.quizes)) {
            _context4.next = 34;
            break;
          }
          console.log("Hey!!");
          _context4.next = 31;
          return _course4.Course.findByIdAndUpdate({
            _id: req.params.id
          }, {
            $push: {
              quizes: req.body.quizes
            }
          }, {
            "new": true
          }).exec();
        case 31:
          _updatedCourse3 = _context4.sent;
          if (_updatedCourse3) {
            _context4.next = 34;
            break;
          }
          return _context4.abrupt("return", res.status(400));
        case 34:
          if (!req.body.department) {
            _context4.next = 47;
            break;
          }
          _context4.next = 37;
          return _course4.Course.findById(req.params.id).lean().exec();
        case 37:
          _course3 = _context4.sent;
          _context4.next = 40;
          return _department.Department.findById(req.body.department).exec();
        case 40:
          department = _context4.sent;
          if (department.courses.includes(req.params.id)) {
            _context4.next = 47;
            break;
          }
          _context4.next = 44;
          return _department.Department.updateOne({
            _id: department._id
          }, {
            $push: {
              courses: req.params.id
            }
          }, {
            "new": true
          });
        case 44:
          updatedDepartment = _context4.sent;
          if (updatedDepartment) {
            _context4.next = 47;
            break;
          }
          return _context4.abrupt("return", res.status(400));
        case 47:
          // if(req.body.users) {
          //     const course = await Course.findById(req.params.id)
          //     .exec();
          //     if(!course.pdfLinks.includes(req.body.pdfLinks)) {
          //         console.log("Hey!!")
          //         const updatedCourse = await Course.findByIdAndUpdate({_id:req.params.id} , {$push: {pdfLinks:req.body.pdfLinks}} , {new: true})
          //         .exec()
          //         if(!updatedCourse) {
          //             return res.status(400)
          //         }
          //     }
          // }
          body = {
            name: req.body.name,
            code: req.body.code,
            department: req.body.department
          };
          _context4.next = 50;
          return _course4.Course.findByIdAndUpdate({
            _id: req.params.id
          }, body, {
            "new": true
          }).populate('department').lean().exec();
        case 50:
          updatedCourse = _context4.sent;
          if (updatedCourse) {
            _context4.next = 53;
            break;
          }
          return _context4.abrupt("return", res.status(400).end());
        case 53:
          return _context4.abrupt("return", res.status(200).json({
            updatedCourse: updatedCourse
          }));
        case 54:
          return _context4.abrupt("return", res.status(401).json({
            error: "You are not authorized to perform such an action!"
          }));
        case 57:
          _context4.prev = 57;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(400).end();
        case 61:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 57]]);
  }));
  return function updateCourse(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateCourse = updateCourse;
var deleteCourse = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var course, index, user, department, deletedCourse;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!req.user.isAdmin) {
            _context5.next = 28;
            break;
          }
          _context5.next = 4;
          return _course4.Course.findById(req.params.id).lean().exec();
        case 4:
          course = _context5.sent;
          if (course) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            messgae: "there is no such Course"
          }));
        case 7:
          index = 0;
        case 8:
          if (!(index < course.users.length)) {
            _context5.next = 22;
            break;
          }
          _context5.next = 11;
          return _user.User.findByIdAndUpdate({
            _id: course.users[index]
          }, {
            $unset: {
              courses: course._id
            }
          }, {
            "new": true
          });
        case 11:
          user = _context5.sent;
          _context5.next = 14;
          return _department.Department.findByIdAndUpdate({
            _id: course.department
          }, {
            $unset: {
              courses: course._id
            }
          }, {
            "new": true
          });
        case 14:
          department = _context5.sent;
          if (user) {
            _context5.next = 17;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            msg: "course error!!  "
          }));
        case 17:
          if (department) {
            _context5.next = 19;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            msg: "course error!!  "
          }));
        case 19:
          index++;
          _context5.next = 8;
          break;
        case 22:
          _context5.next = 24;
          return _course4.Course.findByIdAndDelete(req.params.id).lean().exec();
        case 24:
          deletedCourse = _context5.sent;
          if (deletedCourse) {
            _context5.next = 27;
            break;
          }
          return _context5.abrupt("return", res.status(400).end());
        case 27:
          return _context5.abrupt("return", res.status(200).json({
            Message: "Course Deleted!"
          }));
        case 28:
          return _context5.abrupt("return", res.status(401).json({
            error: "You are not authorized to perform such an action!"
          }));
        case 31:
          _context5.prev = 31;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(400).end();
        case 35:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 31]]);
  }));
  return function deleteCourse(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteCourse = deleteCourse;