"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  loginId: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  level: {
    type: String,
    required: true
  },
  isDoctor: {
    type: Boolean,
    "default": false
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'department'
  },
  courses: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'course'
  }]
}, {
  timestamps: true
});
userSchema.pre('save', function (next) {
  var _this = this;
  if (!this.isModified('password')) {
    return next();
  }
  _bcryptjs["default"].hash(this.password, 8, function (err, hash) {
    if (err) {
      return next(err);
    }
    _this.password = hash;
    next();
  });
});
userSchema.methods.checkPassword = function (password) {
  var passwordHash = this.password;
  return new Promise(function (resolve, reject) {
    _bcryptjs["default"].compare(password, passwordHash, function (err, same) {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};
var User = _mongoose["default"].model('user', userSchema);
exports.User = User;