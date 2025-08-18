// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../model/Usermodel.js";
import jwt from "jsonwebtoken";
// Helper to generate random account number
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10-digit number
};

export async function register(req, res) {
  try {
    const { firstName, lastName, email, password, phone, address, pin } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !pin) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password & pin
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(pin, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      pin: hashedPin,
      accountNumber: `AC${generateAccountNumber()}`,
      balance: 5000, 
      transactions: []// Default
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        accountNumber: newUser.accountNumber,
        balance: newUser.balance,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req,res) {
    const {email,password} = req.body;
 
    
    if(!email || !password){
        return res.status(400).json({message:"Enter details"})
    }
    const existingUser = await User.findOne({email});
   
    
    if(!existingUser){
        return res.status(404).json({message:"No user found"})
    }
    const checkPassword = await bcrypt.compare(password,existingUser.password);
    if(!checkPassword) {
        return res.status(401).json({message:"password does not match"})
    }
    const token = jwt.sign({userid: existingUser._id},process.env.JWT_SECRET_KEY);
   res
  .cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  })
  .status(200)
  .json({ success: true, message: "Logged in successfully", user: existingUser });
 
}

export async function getuserbyid(req,res) {
    const token = req.cookies.token;
    if(!token){
     return res.status(401).json({messgae:"No token found"})
    }
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     const foundeUser =  await User.findById(decoded?.userid);
     return res.status(200).json({userdata: foundeUser})
   } catch (error) {
    res.status(401).json({bugga:{error}})
   }
}
export async function getusers(req,res) {
  try {
    const Users = await User.find({});
    return res.status(200).json({Users})
  } catch (error) {
    return res.status(401).json({Failure:error})
  }
}