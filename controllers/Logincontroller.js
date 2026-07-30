const usermodel = require('../models/Userschema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await usermodel.findOne({
            username
        });
        //check if user  is registered
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        };

        //pwd compare
        const compare = await bcrypt.compare(
            password,
            user.password);
            if (!compare) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }
        const token = jwt.sign(
            {
                id : user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn : '1h'
            }
        );

        
         res.status(200).json({
            success: true,
            message: 'Login successfull',
            token: token,
            user: {
                email : user.email,
                username: user.username
            }
        });

    } catch (err) {
         res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { login };
