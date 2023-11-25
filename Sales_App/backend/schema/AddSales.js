//Add slaes schema
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const AddSalesSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    }, 
     amount:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: ObjectId,
        ref: "UserModel"
    }
});
const AddSales = mongoose.model('AddSales', AddSalesSchema);
module.exports = AddSales;
