import express from 'express' 
import mongoose from 'mongoose'
import morgan  from 'morgan'
import cors from 'cors'
import { config } from './config/dev'

import userRouter from './src/user/user.router'
import departmentRouter from './src/department/department.router'
import courseRouter from './src/course/course.router' 

import {json , urlencoded} from 'body-parser'

import { protect , signin , signup} from './utils/auth'


// app setup 

const app = express ();
const PORT = process.env.PORT || 8000 ;
app.use(cors())

//body-parser setup
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {
    res.send("Hello")
})
app.use('/login' , signin)
app.use('/register', signup )
app.use('/api' , protect)
app.use('/api/user' , userRouter)
app.use('/api/department' , departmentRouter)
app.use('/api/course' , courseRouter)


mongoose.connect(config.secrets.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongodb is connected!!")
        app.listen(PORT, () => {
            console.log(`server is runing on port ${PORT}`)
        })
    })
    .catch((e) => console.log(e))