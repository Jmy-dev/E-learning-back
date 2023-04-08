import isEmpty from './isEmpty'
import Validator from 'validator'
import {Course} from '../src/course/course.model';



export const validateCourseInput = async (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.code = !isEmpty(data.code) ? data.code : '';

    const existedName = await Course.findOne({name: data.name})
    .lean()
    .exec()
    if(existedName) {
        errors.name = "This Course Name is already exist"
    }

    const existedCode = await Course.findOne({code: data.code})
    .lean()
    .exec()
    if(existedCode) {
        errors.code = "This Course Code is already exist"
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field is required!"
    }
    if(Validator.isEmpty(data.code)) {
        errors.code = "Code field is required!"
    }

    return {
        errors ,
        isValid: isEmpty(errors)
    }


}