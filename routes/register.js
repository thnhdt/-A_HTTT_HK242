const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/user');

const Register = async (req, res) => {
    const { username, password } = req.body;
    if (username === "" || password === "") return res.status(400).json({ message: "Chưa nhập đủ thông tin" });

    try {
        const existingUser = await User.findOne({
            where: {
              username: username,
            },
          });
        if (existingUser) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, password: hashedPassword});
        await newUser.save();
        res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: "Error" });
    }
}

router.post('/', Register);
router.get('/', (req, res) => {
      res.send("Testing");
    });

module.exports = router;