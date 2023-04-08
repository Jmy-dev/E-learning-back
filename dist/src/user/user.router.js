"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = require("./user.controller");
var router = (0, _express.Router)();

//api/user/me
router.get('/me', _user.me);

//api/user/:id

router.route('/:id').get(_user.getUser).put(_user.updateUser)["delete"](_user.deleteUser);
var _default = router;
exports["default"] = _default;