import { Router} from 'express'

import { createDepartment, getDepartment, getAllDepartments, updateDepartment , deleteDepartment ,getDepartmentUsers  , getAllDepartmentCourses} from './department.controller'

const router = Router();


//api/department
// get - getall  
// post - create

router.route('/')
.get(getAllDepartments)
.post(createDepartment)



//api/department/:id
//get     getOne
//put     updateOne
//delete  deleteOne

router.route('/:id')
.get(getDepartment)
.put(updateDepartment)
.delete(deleteDepartment)



//api/department/:id/users


router.route('/:id/users')
.get(getDepartmentUsers)

//api/department/:id/courses

router.route('/:id/courses')
.get(getAllDepartmentCourses)



export default router;
