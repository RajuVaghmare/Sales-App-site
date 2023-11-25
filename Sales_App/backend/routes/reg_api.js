const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_SECRET} = require('../confij');
const UserModel = require('../schema/user_Model');


//Route to register a user
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    // Check if input fields are empty
    if(!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'One Or More Input Fields are Empty ' });
    }else{
        try {
            const userInDB = await UserModel.findOne({ email: email });
            if (userInDB) {
                return res.status(500).json({ error: "User with this email already registered" });
            }
            const hashedPassword = await bcryptjs.hash(password, 16);
            const user = new UserModel({ first_name, last_name, email, password: hashedPassword });
            const newUser = await user.save();
            res.status(201).json({ result: "User Signed up Successfully!" });
        } catch (err) {
            console.log(err);
        }
    }
});

//Route to login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Check if input fields are empty
    if (!email || !password) {
        return res.status(400).json({ error: 'One Or More Input Fields are Empty ' });
    }else{
        const userInDB = await UserModel.findOne({email: email});
        if(!userInDB){
            return res.status(401).json({ error: "Invalid User email " });
        }else{
          const compare =  await bcryptjs.compare(password, userInDB.password);
          if(compare){
            const jwttoken = jwt.sign( {_id: userInDB._id }, JWT_SECRET);
            const userInfo = { "email": userInDB.email, "fullName": `${userInDB.first_name} ${userInDB.last_name}`};
            return res.status(200).json({ result: { token: jwttoken, user: userInfo } });
          }else{
            return res.status(401).json({ error: "Invalid User password " });
          }

        }
    }
 
})

module.exports = router;
