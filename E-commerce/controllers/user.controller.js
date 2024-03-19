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

export const update = async(req, res) => {
    try {
        const isExist = await User.findById({_id: req.params.id})
        if(!isExist) return res.status(404).json({message:'User not found'});
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;
        }
        const updatedDetails = await User.findByIdAndUpdate(isExist._id, req.body, {new:true});
        return res.status(200).json(updatedDetails);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const isExist = await User.findById({_id:id});
        if(!isExist) return res.status(404).json({message:'User not found'});
        const deletedInfo = await User.findByIdAndDelete(isExist._id);
        return res.status(200).json({message:'User deleted successfully'});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}


export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        if(users.length === 0) return res.status(404).json({message: 'You have no users!'});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

export const getUser = async(req, res) => {
    try {
        const id = req.params.id;
        const isExist = await User.findById({_id:id});
        if(!isExist) return res.status(404).json({message: 'No user found'});
        return res.status(200).json(isExist);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}