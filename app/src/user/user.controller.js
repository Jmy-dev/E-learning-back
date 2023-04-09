import {User} from './user.model'
import {Course} from '../course/course.model'
import { validateRegisterInput } from '../../validation/register'

import bcrypt from 'bcryptjs'
import { Department } from '../department/department.model'


export const me = (req , res) => {
    res.status(200).json({data : req.user})
}


export const getUser = async (req , res) => {
    try {

        const user = await User.findOne({_id: req.params.id})
        .populate('department' , 'course')
        .lean()
        .exec()

        if(!user) {
            return res.status(400).end()
        }
        return res.status(200).json({data: user})
        
    } catch (e) {
        return res.status(400).end();
    }
}

export const updateUser = async (req , res) => {
    try {

       
       
        //OWNER
        if(req.body.name || req.body.loginId) {
            return res.status(400).end()
        }
        const ownerId = req.params.id;
        //EXECUTER 
        const executerId = req.user._id;

        if(ownerId == executerId || req.user.isAdmin) {

            if(req.body.department) {

                const user = await User.findById(req.params.id)
                .lean()
                .exec()

                if(!user) {
                    return res.status(400).json({error: "there is no such a user"})
                }

                const department = await Department.findById(req.body.department)
                .exec();

                if(!department) {
                    return res.status(400).json({error: "Department error!!"})
                }

                if(!department.users.includes(ownerId)) {
                    const updatedDepartment = await Department.updateOne({_id:department._id},{$push: {users: ownerId}} , {new: true} );
                   if(!updatedDepartment) {
                    return res.status(400);
                   }
                }
                
        
            } 

            if(req.body.courses) {
                const user = await User.findById(req.params.id)
                .lean()
                .exec()

                const course = await Course.findById(req.body.courses)
                .exec()
                
                if(!course.users.includes(ownerId)) {
                    const updatedCourse  = await Course.updateOne({_id:course._id} , {$push: {users: ownerId}} , {new: true}); 

                    if(!updatedCourse) {

                        return res.status(400)
                    }
                    
                    
                }
            }

            const updatedUser = await User.findOneAndUpdate ({_id: req.params.id} , req.body , {new: true})
            .exec()
    
            if(!updatedUser) {
                return res.status(400). end();
            }
    
            return res.status(201).json({updatedUser})
        }

        return res.status(401).json({error : 'you are not authorized!!'})
        
    } catch (e) {
        console.error(e);
        res.status(400).end()
    }
}


export const deleteUser = async (req , res) => {

    try {

        if( req.user.isAdmin) {
            const user = await User.findById(req.params.id)
            .lean()
            .exec()

            if (!user) {
                return res.status(404).end()
            }
            const deletedUser = await User.findOneAndDelete({
                _id:req.params.id
            })

            if(!deletedUser){
                return res.status(400).end()
            }
            return res.status(200).json({msg: 'deleted!'})
        }

        return res.status(401).json({error: "You are not Authorized to perform such an action"})

        
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }

}

