import Product from "../models/product.model.js";

export const create = async(req,res) => {
    try {
        const productData = req.body;
        if(!productData.productName || !productData.productRate || !productData.productQty || !productData.productCategory) return res.status(400).json({message: 'All fields are mandatory'});
        const isAlreadyProduct = await Product.find({$and:[{productName:productData.productName, productCategory:productData.productCategory}]});
        if(isAlreadyProduct.length === 0){
            const product = new Product(productData);
            await product.save();
            return res.status(200).json(product);
        }
        return res.status(409).json({message:'Same product with same category already exist'});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();
        console.log(products);
        if(products.length === 0) return res.status(404).json({message: 'You have no products available!'});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}