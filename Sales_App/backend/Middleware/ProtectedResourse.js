const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../confij');

const mongoose = require('mongoose');
const UserModel = require('../schema/user_Model');//import user schema

module.exports = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "User not logged in"});
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, JWT_SECRET);
       
        const {_id} = payload;
        const dbUser = await UserModel.findById(_id);
        req.user = dbUser;
        next(); //goes to the next middleware or goes to the REST API
    } catch (error) {
        return res.status(401).json({error: "User not logged in"});
    }
};




