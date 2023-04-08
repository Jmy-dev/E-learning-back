"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.signup = exports.signin = exports.protect = exports.newToken = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dev = require("../config/dev");
var _user = require("../src/user/user.model");
var _login = require("../validation/login");
var _register = require("../validation/register");
var newToken = function newToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user.id
  }, _dev.config.secrets.jwtSecret || process.env.jwtSecret, {
    expiresIn: _dev.config.secrets.jwtExp || process.env.jwtExp
  });
};
exports.newToken = newToken;
var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].verify(token, _dev.config.secrets.jwtSecret || process.env.jwtSecret, function (err, payload) {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};
exports.verifyToken = verifyToken;
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$validateRegist, errors, isValid, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _register.validateRegisterInput)(req.body);
        case 3:
          _yield$validateRegist = _context.sent;
          errors = _yield$validateRegist.errors;
          isValid = _yield$validateRegist.isValid;
          if (isValid) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            errors: errors
          }));
        case 8:
          _context.next = 10;
          return _user.User.create(req.body);
        case 10:
          user = _context.sent;
          if (user) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(400).end());
        case 13:
          return _context.abrupt("return", res.status(201).json({
            user: user
          }));
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(400).end());
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.signup = signup;
var signin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _yield$validateLoginI, errors, isValid, user, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _login.validateLoginInput)(req.body);
        case 3:
          _yield$validateLoginI = _context2.sent;
          errors = _yield$validateLoginI.errors;
          isValid = _yield$validateLoginI.isValid;
          if (isValid) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            errors: errors
          }));
        case 8:
          _context2.next = 10;
          return _user.User.findOne({
            loginId: req.body.loginId
          }).exec();
        case 10:
          user = _context2.sent;
          token = newToken(user);
          if (token) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(400).end());
        case 14:
          return _context2.abrupt("return", res.status(201).json({
            token: token
          }));
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(400).end());
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 17]]);
  }));
  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.signin = signin;
var protect = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var token, payload, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (req.headers.authorization) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            error: 'Not Authorized!!'
          }));
        case 3:
          token = req.headers.authorization.split('Bearer ')[1];
          if (token) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(400).end());
        case 6:
          _context3.next = 8;
          return verifyToken(token);
        case 8:
          payload = _context3.sent;
          if (payload) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            error: "Nor Authorized"
          }));
        case 11:
          _context3.next = 13;
          return _user.User.findById(payload.id).select('-password').lean().exec();
        case 13:
          user = _context3.sent;
          if (user) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", res.status(400).end());
        case 16:
          console.log("user here", user);
          req.user = user;
          next();
          _context3.next = 25;
          break;
        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          return _context3.abrupt("return", res.status(400).json({
            error: 'Not Authorized'
          }));
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 21]]);
  }));
  return function protect(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
exports.protect = protect;