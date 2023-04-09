import {Router} from 'express'

import {me , getUser , updateUser , deleteUser , getAllStudents , getAllDoctors} from './user.controller'

const router = Router();


//api/user/me
router.get('/me' , me);

//api/user/students

router.get('/students' , getAllStudents)

//api/user/doctors 

router.get('/doctors' , getAllDoctors)

//api/user/:id

router
   .route('/:id')
   .get(getUser)
   .put(updateUser)
   .delete(deleteUser)

   

export default router;