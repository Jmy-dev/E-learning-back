import mongoose  from 'mongoose'
import bcrypt from 'bcryptjs'



const userSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true ,
        unique: true ,
        trim: true
    } ,
    loginId:{
       type: String ,
       required : true ,
       unique: true
    },
    isAdmin: {
        type: Boolean ,
        default: false
    } ,
    level:{
        type: String ,
        required: true
    },
    isDoctor: {
        type: Boolean ,
         default: false
    } ,

    password:{
        type:String ,
        required: true 
    } ,

    department: {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'department'
    } ,
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'course'
        }
    ]  



} , {timestamps: true})

userSchema.pre('save', function (next) {
    
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err);
        }

        this.password = hash;
        next();

    })

})

userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err)
            }

            resolve(same);
        })
    })
}


export const User = mongoose.model('user' , userSchema);
