const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Info = require('../model/userInfo')

const Register = async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    if ( !first_name || !last_name || !username || !email || !password )
        return res.status(400).json({ message: "Chưa nhập đủ thông tin" });

    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" });
        }

        var newId = new mongoose.mongo.ObjectId();

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ _id: newId, username, password: hashedPassword }); //info
        await newUser.save();

        const newInfo = new Info({ _id: newId, username, first_name, last_name, email });
        await newInfo.save();

        res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: "Error" });
    }
}

const Login = async (req, res) => {
    const { username, password } = req.body;   
    if (username === "") return res.status(400).json({ message: "Thiếu tên tài khoản" });
    if (username !== "" && password === "") return res.status(400).json({ message: "Thiếu mật khẩu" });

    try {
        const existingUser = await User.findOne({username});
        if (!existingUser)
            return res.status(400).json({ message: "Người dùng không tồn tại" });
        const salt = existingUser.password.substring(0, 29);
        const hashedPassword = await bcrypt.hash(password, salt);
        if (existingUser.password !== hashedPassword) 
            return res.status(400).json({ message: "Đăng nhập thất bại" });

        const info = await Info.findOne({username});

        var jwt = require('jsonwebtoken');
        var auth_key = jwt.sign({ _id: existingUser._id, username }, process.env.KEY);

        const response =
        {
            id: info._id.toString(),
            token: auth_key,
            first_name: info.first_name,
            last_name: info.last_name,
            email: info.email
        }

        res.status(200).json(response);

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: "Error" });
    }

}

router.post('/register', Register);
router.get('/register', (req, res) => {
    res.render("register");
})

router.post('/login', Login);
router.get('/login', (req, res) => {
    res.render("login");
})

router.get('/', (req, res) => {
      res.send("Testing");
});

module.exports = router;