import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config({});
import db_connect from './uitls/db.utils.js';
import userRoute from './routes/user.route.js'

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

app.get( '/' , ( req , res ) => {
    res.send("server is ready")
})
 

//api's
app.use("/api/v1/user", userRoute);

db_connect().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Database connection failed", err);
});