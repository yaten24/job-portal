import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config({});
import db_connect from './uitls/db.utils.js';

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http//localhost:5173',
    credential: true
}
app.use(cors(corsOptions));

app.get( '/' , ( req , res ) => {
    res.send("server is ready")
})

const PORT = process.env.PORT || 3000;
app.listen( PORT , () => {
    db_connect();
    console.log(`server is running at port http://localhost:${PORT}`);
    
})