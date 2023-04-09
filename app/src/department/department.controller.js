import {Department} from './department.model'
import {User} from '../user/user.model'
import {Course} from '../course/course.model'
import { validateDepartmentInput } from '../../validation/department'



export const getDepartment = async (req , res) =>{
    try {
        const department = await Department.findById(req.params.id)
        .populate('users')
        .lean()
        .exec()

        if(department) {
         return res.status(200).json({department})
        }

        return res.status(400).end()
        
        
    } catch (e) {
        res.status(400).end()
    }
}


export const createDepartment = async (req , res) => {

    try {
        //validate department input

        const {errors , isValid} = await validateDepartmentInput(req.body)
        if(!isValid) {
            return res.status(400).json({errors})
        }
        
        const department =await  Department.create(req.body)

        if(department) {
            return res.status(201).json({department})
        }

        return res.status(400).end()
        
    } catch (e) {
        res.status(400).end()
    }
}

export const updateDepartment = async (req , res) => {
    try {

        if(req.user.isAdmin) {

            const updatedDepartment = await Department.findByIdAndUpdate({_id:req.params.id} , req.body , {new:true})
            .lean()
            .exec()
            
            if(updatedDepartment) {
                return res.status(201).json({updatedDepartment})
            }
            
            return res.status(400).end()
        }
        return res.status(401).json({error: "You are not authorized to perform such an action"})
    } catch (e) {
         res.status(400).end()
    }
}

export const deleteDepartment = async (req , res) => {
    try {
        if(req.user.isAdmin) {

            // get the department
            const department = await Department.findById(req.params.id)
            .lean()
            .exec()

            if(!department) {
                return res.status(404).json({error: "there is no such department!"})
            }
            // loop inside the department and unset the department id from all it's users
            for (let index = 0; index < department.users.length; index++) {
                const user = await User.findByIdAndUpdate({ _id: department.users[index] }, { $unset: { department: department._id } }, { new: true });
                const course = await Course.findByIdAndUpdate({ _id: department.courses[index]}, { $unset: { department: department._id } }, { new: true });

                if (!user) {
                    return res.status(404).json({ msg: "department error!!  " })
                }
                if(!course) {
                    return res.status(400).json({msg: "course error!!"})
                }

            }
            //delete the department

            const deleteDepartment = await Department.findByIdAndDelete(req.params.id)

            if(deleteDepartment) {
                return res.status(200).json({msg: "Department Deleted"})
            }
            return res.status(400).end()

        }
        return res.status(401).json({error: "You are not authorized to perform such an action!"})
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}


export const getAllDepartments = async (req , res) => {
    try {

        const departments = await Department.find({})
        .populate('courses' , 'users')
        .lean()
        .exec()
        if(departments.length == 0) {
            return res.status(200).json({msg: "There is no departments yet !"})
        }
        if(departments) {
            return res.status(200).json({ departments })
        }
        return res.status(400).end()


        
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const getDepartmentUsers = async (req , res) => {
    try {
        const users = await Department.findById(req.params.id)
        .select('users')
        .populate('users')
        .lean()
        .exec()

        if(users) {
            return res.status(200).json({users})
        }
        res.status(400).end()
        
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const getAllDepartmentCourses = async (req , res) => {
    try {
     const courses = await Department.findById(req.params.id)
     .select('courses')
     .populate('course')
     .lean()
     .exec()

     if(!courses) {
        return res.status(400).end()
     }
     return res.status(200).json({courses})
     
    } catch (e) {
     res.status(400).end()
    }
 
 }

