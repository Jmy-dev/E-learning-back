import {Router} from 'express'

import {me , getUser , updateUser , deleteUser} from './user.controller'

const router = Router();


//api/user/me
router.get('/me' , me);

//api/user/:id

router
   .route('/:id')
   .get(getUser)
   .put(updateUser)
   .delete(deleteUser)


export default router;