"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _course = require("./course.controller");
var router = (0, _express.Router)();

// /api/course
// get getAllCourses
// post create course

router.route('/').get(_course.getAllCourses).post(_course.createCourse);

// /api/course/:id
// get getOne
// put updateOne
// delete deleteOne

router.route('/:id').get(_course.getCourse).put(_course.updateCourse)["delete"](_course.deleteCourse);
var _default = router;
exports["default"] = _default;