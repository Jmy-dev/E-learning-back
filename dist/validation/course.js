"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCourseInput = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _isEmpty = _interopRequireDefault(require("./isEmpty"));
var _validator = _interopRequireDefault(require("validator"));
var _course = require("../src/course/course.model");
var validateCourseInput = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var errors, existedName, existedCode;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          errors = {};
          data.name = !(0, _isEmpty["default"])(data.name) ? data.name : '';
          data.code = !(0, _isEmpty["default"])(data.code) ? data.code : '';
          _context.next = 5;
          return _course.Course.findOne({
            name: data.name
          }).lean().exec();
        case 5:
          existedName = _context.sent;
          if (existedName) {
            errors.name = "This Course Name is already exist";
          }
          _context.next = 9;
          return _course.Course.findOne({
            code: data.code
          }).lean().exec();
        case 9:
          existedCode = _context.sent;
          if (existedCode) {
            errors.code = "This Course Code is already exist";
          }
          if (_validator["default"].isEmpty(data.name)) {
            errors.name = "Name field is required!";
          }
          if (_validator["default"].isEmpty(data.code)) {
            errors.code = "Code field is required!";
          }
          return _context.abrupt("return", {
            errors: errors,
            isValid: (0, _isEmpty["default"])(errors)
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function validateCourseInput(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.validateCourseInput = validateCourseInput;