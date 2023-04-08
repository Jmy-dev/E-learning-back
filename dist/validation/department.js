"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDepartmentInput = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _isEmpty = _interopRequireDefault(require("./isEmpty"));
var _validator = _interopRequireDefault(require("validator"));
var _department = require("../src/department/department.model");
var validateDepartmentInput = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var errors, exist;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          errors = {};
          data.name = !(0, _isEmpty["default"])(data.name) ? data.name : '';
          _context.next = 4;
          return _department.Department.findOne({
            name: data.name
          }).lean().exec();
        case 4:
          exist = _context.sent;
          if (exist) {
            errors.name = "This department Name is already exist";
          }
          if (_validator["default"].isEmpty(data.name)) {
            errors.name = "Name field is required!";
          }
          return _context.abrupt("return", {
            errors: errors,
            isValid: (0, _isEmpty["default"])(errors)
          });
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function validateDepartmentInput(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.validateDepartmentInput = validateDepartmentInput;