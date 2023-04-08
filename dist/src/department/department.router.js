"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _department = require("./department.controller");
var router = (0, _express.Router)();

//api/department
// get - getall  
// post - create

router.route('/').get(_department.getAllDepartments).post(_department.createDepartment);

//api/department/:id
//get     getOne
//put     updateOne
//delete  deleteOne

router.route('/:id').get(_department.getDepartment).put(_department.updateDepartment)["delete"](_department.deleteDepartment);

//api/department/:id/users

router.route('/:id/users').get(_department.getDepartmentUsers);

//api/department/:id/courses

router.route('/:id/courses').get(_department.getAllDepartmentCourses);
var _default = router;
exports["default"] = _default;