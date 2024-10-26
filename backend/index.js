const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const router = require("./controller/Routes");
const routesForUser = require("./controller/RoutesForUser");
const ConnectDb = require("./Db/ConnectDb");

dotenv.config();

const app = express();
ConnectDb();


const corsOptions = {
    origin:  ['http://localhost:5173','https://manager-task-pcfj.vercel.app']
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api/tasks', router);
app.use('/api/user', routesForUser);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
