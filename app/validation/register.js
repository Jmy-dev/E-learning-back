import Validator from 'validator'
import isEmpty from './isEmpty'
import {User} from '../src/user/user.model'
import {Department} from '../src/department/department.model'


export const validateRegisterInput = async (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.level = !isEmpty(data.level) ? data.level : '';
    data.loginId = !isEmpty(data.loginId) ? data.loginId : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

   
    if(data.department) {
        const department = await Department.findById(data.department)
        .lean()
        .exec()

        if(!department) {
            errors.department = "There is no such department"
        }

        
    }

    const existLoginId = await User.findOne({loginId: data.loginId})
    .lean()
    .exec()
    
    if (existLoginId) {
        errors.loginId = "loginId is already exist";
    }
    const existName = await User.findOne({name: data.name})
    .lean()
    .exec()

    if (existName) {
        errors.name = "Name is already exist";
    }

    if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = "Name Must be between 3 and 30 characters!";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required !';
    }
    if(data.level > 4) {
        errors.level = "Level must be between 1 and 4 "
    }
    if(Validator.isEmpty(data.level)) {
        errors.level = 'Level field is required !'
    }
    if (Validator.isEmpty(data.loginId)) {
        errors.loginId = 'loginId field is required !';
    }

    if (!Validator.isLength(data.password, { min: 8, max: 16 })) {
        errors.password = 'Password must be between 8 and 16 characters';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = " Confirm Password field is required";
    }

    return {
        errors ,
        isValid: isEmpty(errors)
    }



 
}