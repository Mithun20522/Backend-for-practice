import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productRate:{
        type:Number,
        required:true
    },
    productQty:{
        type:Number,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    }
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

export default Product;