"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegisterInput = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _validator = _interopRequireDefault(require("validator"));
var _isEmpty = _interopRequireDefault(require("./isEmpty"));
var _user = require("../src/user/user.model");
var validateRegisterInput = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var errors, existLoginId, existName;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          errors = {};
          data.name = !(0, _isEmpty["default"])(data.name) ? data.name : '';
          data.level = !(0, _isEmpty["default"])(data.level) ? data.level : '';
          data.loginId = !(0, _isEmpty["default"])(data.loginId) ? data.loginId : '';
          data.password = !(0, _isEmpty["default"])(data.password) ? data.password : '';
          data.password2 = !(0, _isEmpty["default"])(data.password2) ? data.password2 : '';
          _context.next = 8;
          return _user.User.findOne({
            loginId: data.loginId
          }).lean().exec();
        case 8:
          existLoginId = _context.sent;
          if (existLoginId) {
            errors.loginId = "loginId is already exist";
          }
          _context.next = 12;
          return _user.User.findOne({
            name: data.name
          }).lean().exec();
        case 12:
          existName = _context.sent;
          if (existName) {
            errors.name = "Name is already exist";
          }
          if (!_validator["default"].isLength(data.name, {
            min: 3,
            max: 30
          })) {
            errors.name = "Name Must be between 3 and 30 characters!";
          }
          if (_validator["default"].isEmpty(data.name)) {
            errors.name = 'Name field is required !';
          }
          if (data.level > 4) {
            errors.level = "Level must be between 1 and 4 ";
          }
          if (_validator["default"].isEmpty(data.level)) {
            errors.level = 'Level field is required !';
          }
          if (_validator["default"].isEmpty(data.loginId)) {
            errors.loginId = 'loginId field is required !';
          }
          if (!_validator["default"].isLength(data.password, {
            min: 8,
            max: 16
          })) {
            errors.password = 'Password must be between 8 and 16 characters';
          }
          if (_validator["default"].isEmpty(data.password)) {
            errors.password = "Password field is required";
          }
          if (!_validator["default"].equals(data.password, data.password2)) {
            errors.password2 = "Passwords must match";
          }
          if (_validator["default"].isEmpty(data.password2)) {
            errors.password2 = " Confirm Password field is required";
          }
          return _context.abrupt("return", {
            errors: errors,
            isValid: (0, _isEmpty["default"])(errors)
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function validateRegisterInput(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.validateRegisterInput = validateRegisterInput;