import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const isExist = await User.findOne({email});
        if(isExist) return res.status(409).json({message:"User already exist"});
        const newUser = new User({
            username,
            email,
            password
        })
        await newUser.save();
        return res.status(200).send(newUser);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const isExist = await User.findOne({email});
        if(!isExist) return res.status(404).json({message:"User Not found"});
        const isMatched = await bcrypt.compare(password, isExist.password);
        if(!isMatched) return res.status(400).json({message:"Incorrect Password"});

        const isAlreadyLoggedIn = req.cookies.token;
        if(isAlreadyLoggedIn) return res.status(400).json({message:'You are already logged in'});

        const token = jwt.sign({userId:isExist._id}, process.env.SECRET_TOKEN_KEY, {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly:true, maxAge:3600000});
        res.status(200).json({message:'Logged in Successfully'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const logout = async(req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(400).json({message: 'Login required'});
        res.clearCookie('token');
        return res.status(200).json({message:'logout successfully'});
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
    
}