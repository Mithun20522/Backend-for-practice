import User from '../models/user.model.js';

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