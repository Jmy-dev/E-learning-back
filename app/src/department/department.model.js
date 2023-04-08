import mongoose from 'mongoose' ;



const departmentSchema = new mongoose.Schema ({
    name: {
        type:String , 
        required: true
    } ,
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'course'
        }
    ] ,
    users: [
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref: 'user'
        }
    ]
} , {timestamps:true})


export const Department = mongoose.model('department' , departmentSchema);