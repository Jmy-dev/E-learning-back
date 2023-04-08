import mongoose from 'mongoose';


const courseSchema = new mongoose.Schema({

    name: {
        type: String ,
        required: true ,
        unique: true
    } ,
    code: {
        type:String , 
        required:true ,
        unique: true
    } ,
    department: {
      type: mongoose.Schema.Types.ObjectId ,
      ref: 'department'
    } ,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'user'
        }
    ],
    videosURL:[
       {
           type: String  
       }  
    ] ,
    pdfLinks: [
        {
            type : String
        }

    ] , 
    quizes : [
        {
            type: String
        }
    ]
})


export const Course = mongoose.model('course' , courseSchema);
