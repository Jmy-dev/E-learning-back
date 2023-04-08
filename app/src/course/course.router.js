import {Router} from 'express'

import {getCourse , getAllCourses , updateCourse , createCourse , deleteCourse} from './course.controller'

const router = Router();


// /api/course
// get getAllCourses
// post create course

router
.route('/')
.get(getAllCourses)
.post(createCourse)


// /api/course/:id
// get getOne
// put updateOne
// delete deleteOne


router
.route('/:id')
.get(getCourse)
.put(updateCourse)
.delete(deleteCourse)

export default router ;