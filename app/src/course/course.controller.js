import { Course } from "./course.model";
import { User } from "../user/user.model";
import { Department } from "../department/department.model";
import { validateCourseInput } from "../../validation/course";

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).lean().exec();

    if (!course) {
      return res.status(400).end();
    }

    return res.status(200).json({ course });
  } catch (e) {
    res.status(400).end();
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("department")
      .populate("users")
      .lean()
      .exec();

    if (courses.length == 0) {
      return res.status(200).json({ msg: "There is no courses yet !" });
    }
    if (!courses) {
      return res.status(400).end();
    }
    return res.status(200).json({ courses });
  } catch (e) {
    res.status(400).end();
  }
};

export const createCourse = async (req, res) => {
  try {
    const { errors, isValid } = await validateCourseInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const course = await Course.create(req.body);

    if (!course) {
      return res.status(400).end();
    }

    return res.status(201).json({ course });
  } catch (e) {
    res.status(400).end();
  }
};

export const updateCourse = async (req, res) => {
  try {
    if (req.user.isAdmin || req.user.isDoctor) {
      if (req.body.videosURL) {
        const course = await Course.findById(req.params.id).exec();

        if (!course.videosURL.includes(req.body.videosURL)) {
          const updatedCourse = await Course.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { videosURL: req.body.videosURL } },
            { new: true }
          ).exec();

          if (!updatedCourse) {
            return res.status(400);
          }
        }
      }
      if (req.body.pdfLinks) {
        const course = await Course.findById(req.params.id).exec();

        if (!course.pdfLinks.includes(req.body.pdfLinks)) {
          console.log("Hey!!");
          const updatedCourse = await Course.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { pdfLinks: req.body.pdfLinks } },
            { new: true }
          ).exec();
          if (!updatedCourse) {
            return res.status(400);
          }
        }
      }
      if (req.body.quizes) {
        const course = await Course.findById(req.params.id).exec();

        if (!course.quizes.includes(req.body.quizes)) {
          console.log("Hey!!");
          const updatedCourse = await Course.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { quizes: req.body.quizes } },
            { new: true }
          ).exec();
          if (!updatedCourse) {
            return res.status(400);
          }
        }
      }

      if (req.body.assignments) {
        const courses = await Course.findById(req.params.id).exec();

        if (!courses.assignments.includes(req.body.assignments)) {
          const updatedCourse = await Course.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { assignments: req.body.assignments } },
            { new: true }
          ).exec();
          if (!updatedCourse) {
            return res.status(400);
          }
        }
      }

      if (req.body.department) {
        const course = await Course.findById(req.params.id).lean().exec();

        const department = await Department.findById(
          req.body.department
        ).exec();

        if (!department.courses.includes(req.params.id)) {
          const updatedDepartment = await Department.updateOne(
            { _id: department._id },
            { $push: { courses: req.params.id } },
            { new: true }
          );
          if (!updatedDepartment) {
            return res.status(400);
          }
        }
      }
      const body = {
        name: req.body.name,
        code: req.body.code,
        department: req.body.department,
      };
      const updatedCourse = await Course.findByIdAndUpdate(
        { _id: req.params.id },
        body,
        { new: true }
      )
        .populate("department")
        .lean()
        .exec();

      if (!updatedCourse) {
        return res.status(400).end();
      }
      return res.status(200).json({ updatedCourse });
    }
    return res
      .status(401)
      .json({ error: "You are not authorized to perform such an action!" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const deleteCourse = async (req, res) => {
  try {
     //if (req.user.isAdmin) {
      const course = await Course.findById(req.params.id).lean().exec();

      if (!course) {
        return res.status(404).json({ messgae: "there is no such Course" });
      }

      for (let index = 0; index < course.users.length; index++) {
        const user = await User.findByIdAndUpdate(
          { _id: course.users[index] },
          { $unset: { courses: course._id } },
          { new: true }
        );

        if (!user) {
          return res.status(404).json({ msg: "user error!!  " });
        }
      }
      if(req.user.department) {
        
        const department = await Department.findByIdAndUpdate(
          { _id: course.department },
          { $unset: { courses: course._id } },
          { new: true }
        );
      }

      if (!department) {
        return res.status(404).json({ msg: "department error!!  " });
      }
      const deletedCourse = await Course.findByIdAndDelete(req.params.id)
        .lean()
        .exec();

      if (!deletedCourse) {
        return res.status(400).end();
      }
      return res.status(200).json({ Message: "Course Deleted!" });
    //}
    return res
      .status(401)
      .json({ error: "You are not authorized to perform such an action!" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
