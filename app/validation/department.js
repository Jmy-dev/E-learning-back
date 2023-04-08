import isEmpty from './isEmpty'
import Validator from 'validator'
import {Department} from '../src/department/department.model'

export const validateDepartmentInput = async (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';

    const exist = await Department.findOne({name: data.name})
    .lean()
    .exec()

    if(exist) {
        errors.name = "This department Name is already exist"
    }
    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field is required!"
    }

    return {
        errors ,
        isValid: isEmpty(errors)
    }

}