import User from '../models/user.model.js';

export const register = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const newUser = new User({
            username,
            email,
            password
        })
        await newUser.save();
        return res.status(200).send(newUser);
    } catch (error) {
        const isExist = error.keyValue.email === req.body.email;
        if(isExist) return res.status(409).json({Error:'User already Exist'});
        return res.status(500).json({message:'Internal Server Error', Error:error});
        
    }
}