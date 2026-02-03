import User from "../models/Users.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import Car from "../models/Cars.js";
//generate Token
const GenerateToken = (userId) => {
    return jwt.sign({id:userId}, process.env.JWT_SECRET);
}

// User register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password || password.length < 8) {
            return res.json({ success: false, messag: "Fill all the fields" })
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ messag: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = GenerateToken(user._id.toString());
        res.json({ success: true, token });

    } catch (error) {
        return res.json({ success: false, message: error.message});
    }

}

//User Login
export const loginUser =async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
         if(!user){
            return res.json({success:false,message:"User not found"});
         }
          const isMatch=await bcrypt.compare(password,user.password); 
          if(!isMatch){
            return res.json({success:false,message:"Invalid credential"});
          }  
        const token=GenerateToken(user._id.toString());
        res.json({success:true,token});

    }catch(error){
       return res.json({success:false,message:"User not found"});
    }

}

//Get user data

export const  getUserData=async(req,res)=>{
     try {
        const {user}=req;
        res.json({success:true,user});
     } catch (error) {
         return res.json({success:false,message:error.message});
     }
}

// Get All the cars for the frontend

export const  getCars=async(req,res)=>{
     try {
       const cars=await Car.find({isAvailable:true});
       res.json({success:true,cars});
     } catch (error) {
         return res.json({success:false,message:error.message});
     }
}
