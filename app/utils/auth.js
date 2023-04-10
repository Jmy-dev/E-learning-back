import jwt from 'jsonwebtoken' 
import {config} from '../config/dev'
import {User} from '../src/user/user.model'
import { Department } from '../src/department/department.model'
import { validateLoginInput } from '../validation/login'
import { validateRegisterInput } from '../validation/register'




export const newToken = user => {
    return jwt.sign ({ id: user.id} , config.secrets.jwtSecret|| process.env.jwtSecret , {
        expiresIn: config.secrets.jwtExp || process.env.jwtExp
    })
}


export const verifyToken = token => {
    return new Promise ( (resolve , reject) => {
        jwt.verify(token ,  config.secrets.jwtSecret||process.env.jwtSecret , (err , payload) => {
            if (err) {
                return reject(err);
            }
            resolve(payload)
        })
    })
}



export const signup = async (req , res) => {
    try {

        //validate the register data 
        const {errors , isValid} = await validateRegisterInput(req.body)
     
    if(!isValid) {
        return res.status(400).json({errors})
     }
    

        const user = await User.create(req.body);

        if(!user) {
            
            return res.status(400).end()
        }

        if(req.body.department) {
            const department = await Department.findById(req.body.department)
            .lean()
            .exec()
    
            if(!department) {
                return res.status(400).json({error: "There is no such department"}) 
            }
    
        
    
            const updatedDepartment = await Department.findByIdAndUpdate(req.body.department , {$push: {users:user.id}} , {new : true})
            .lean()
            .exec()

            if(!updatedDepartment) {
                return res.status(400).end()
            }
        }


        return res.status(201).json({user})
        
    } catch (e) {
        console.error(e)
        return res.status(400).end();
    }
}

export const signin = async (req , res) => {

    
    
    try {
        //validate login data
        const {errors , isValid} = await validateLoginInput(req.body)
         
        if(!isValid) {
            return res.status(400).json({errors})
         }


        const user = await User.findOne({ loginId: req.body.loginId })
        .populate('department')
        .populate('courses')
        .exec()

        if(!user) {
            return res.status(400).end()
        }

        const token = newToken(user) ;

        if (!token){
            return res.status(400).end()
        }

        return res.status(201).json({user , token})
        
        
    } catch (e) {
        console.error(e)
        return res.status(400).end();
    }
}


export const protect = async (req , res , next) => {

    try {

        if(!req.headers.authorization) {
            return res.status(401).json({error: 'Not Authorized!!'})
        }

        let token = req.headers.authorization.split('Bearer ')[1];

        if (!token) {
            return res.status(400).end();

        }
        const payload = await verifyToken(token);

        if(!payload) {
            return res.status(401).json({error: "Nor Authorized"})
        }

        const user = await User.findById(payload.id)
        .select('-password')
        .lean()
        .exec()

        if (!user) {
            return res.status(400).end()
        }

        console.log( "user here" , user) 

        req.user = user;
        next()


        
    } catch (e) {
        console.error(e)
        return res.status(400).json({error: 'Not Authorized'})
    }
}