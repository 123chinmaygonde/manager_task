const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const router = require("./controller/Routes")
const routesForUser = require("./controller/RoutesForUser")
const ConnectDb = require("./Db/ConnectDb")
const cookieParser = require("cookie-parser")

const app = express()
ConnectDb()

app.use(cors(
    {  origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
    }
))
app.use(express.json())
app.use(cookieParser())

app.use('/api/tasks',router)
app.use('/api/user',routesForUser)
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})
