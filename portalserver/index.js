const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/admin/adminRouter')
const studentAdminRouter = require('./routers/admin/adminRouter-student')
const teacherAdminRouter = require('./routers/admin/adminRouter-teacher')
const studentRouter = require('./routers/student/studentRouter')
const teacherRouter = require('./routers/teacher/teacherRouter')
const classRouter = require('./routers/teacher/classRouter')
const studentClassRouter = require('./routers/student/studentClassRouter')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(adminRouter)
app.use(studentAdminRouter)
app.use(teacherAdminRouter)
app.use(studentRouter)
app.use(teacherRouter)
app.use(classRouter)
app.use(studentClassRouter)

app.get('*', (req, res) => {
    res.send("<h1>Student Portal</H1><br>Cannot GET!")
})

app.listen(port, () => {
    console.log("Server is up on port:", port)
})