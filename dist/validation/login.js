"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLoginInput = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _validator = _interopRequireDefault(require("validator"));
var _isEmpty = _interopRequireDefault(require("./isEmpty"));
var _user = require("../src/user/user.model");
var validateLoginInput = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var errors, existUser, match;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          errors = {};
          data.loginId = !(0, _isEmpty["default"])(data.loginId) ? data.loginId : '';
          data.password = !(0, _isEmpty["default"])(data.password) ? data.password : '';
          _context.next = 5;
          return _user.User.findOne({
            loginId: data.loginId
          }).exec();
        case 5:
          existUser = _context.sent;
          if (existUser) {
            _context.next = 10;
            break;
          }
          errors.loginId = " You have to register first in order to sign in";
          _context.next = 14;
          break;
        case 10:
          _context.next = 12;
          return existUser.checkPassword(data.password);
        case 12:
          match = _context.sent;
          if (!match) {
            errors.password = "incorrect password!";
          }
        case 14:
          if (_validator["default"].isEmpty(data.loginId)) {
            errors.loginId = 'loginId field is required';
          }
          if (_validator["default"].isEmpty(data.password)) {
            errors.password = 'Password field is required';
          }
          return _context.abrupt("return", {
            errors: errors,
            isValid: (0, _isEmpty["default"])(errors)
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function validateLoginInput(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.validateLoginInput = validateLoginInput;