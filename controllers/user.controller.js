import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config({});

export const register = async ( req , res ) => {
    try {
        const { fullname , email , phoneNumber , password , role} = req.body;
        if ( !fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: 'Somthing is missing',
                success: false
            });
        };
        const user = await User.findOne({email});

        if (user) {
            return res.status(400).json({
                message: 'User already exist',
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash( password , 10);

        await User.create({ 
            fullname, 
            email, 
            phoneNumber, 
            password: hashedPassword, 
            role })

    return res.status(201).json({
        message: "account is created",
        success: true
    })
    } catch ( error ) {
        console.log(error);
    }
}


export const login = async ( req , res ) => {
    try {
        const { email , password , role } = req.body;
        if ( !email , !password , !role ) {
            return res.status(400).json({
                message: 'Somthing is missing',
                success: false
            });
        }

        let user = await User.findOne({email});
        if ( !user ){
            return res.status(400).json({
                message: 'incorrect email and password',
                success: false
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if ( !isPasswordMatched ) {
            return res.status(400).json({
                message: 'incorrect email and password',
                success: false
            })
        }

        //check role is  correct or not 
        if ( role != user.role ) {
            return res.status(400).json({
                message: "account is does't exist with this role.",
                succes: false
            })
        }

        const tokenData = {
            userId:user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token" , token , {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`Walcome Back ${user.fullname}`,
            user,
            succes: true
        })

    } catch (error) {
        console.log(error);
        
    }
}