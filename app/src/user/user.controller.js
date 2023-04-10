import {User} from './user.model'
import {Course} from '../course/course.model'
import { validateRegisterInput } from '../../validation/register'

import bcrypt from 'bcryptjs'
import { Department } from '../department/department.model'


export const me = async (req , res) => {
    const me = await User.findById(req.user._id)
    .populate('courses')
    .populate('department')
    .lean()
    .exec()
    console.log(me)
    res.status(200).json({me})
}

export const getAllStudents = async (req , res) => {
    try {

        
        const students = await User.find({isAdmin:false , isDoctor:false})
        .lean()
        .exec()

        if(!students || students.length ==0) {
            return res.status(400).json({error: "There is no students !!"})
        }

        return res.status(200).json({students})
        
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const getAllDoctors = async (req , res) => {
    try {

        
        const doctors = await User.find({ isDoctor:true})
        .lean()
        .exec()

        if(!doctors || doctors.length ==0) {
            return res.status(400).json({error: "There is no doctors !!"})
        }

        return res.status(200).json({doctors})
        
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}


export const getUser = async (req , res) => {
    try {

        const user = await User.findOne({_id: req.params.id})
        .populate('department')
        .populate( 'courses')
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
                if(!user) {
                    return res.status(400).json({error: "there is no such a user"})
                }

                
                const course = await Course.findById(req.body.courses)
                .exec()
                
                if(!course) {
                    return res.status(400).json({error: "course error!!"})
                }

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

