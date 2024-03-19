import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator: function(email){
                const emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}/
                return emailRegx.test(email)
            },
            message: 'Email format is invalid'
        }
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator: function(password){
                return password.length >=8;
            },
            message: 'Password must be of atleast 8 characters long'
        }
    }
},{timestamps:true});

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error.message)
    }

})

const User = mongoose.model('User', userSchema);

export default User;