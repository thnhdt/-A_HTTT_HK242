const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Không được phép truy cập" });
    
    try {
        if (token.startsWith('Bearer ')) 
            token = token.splice(7, token.length);
        const verified = jwt.verify(token, process.env.KEY);
        req.user = verified;
    } catch(err) {
        res.status(400).json({ verified: false, message: "Truy cập không hợp lệ" })
    }
} 

module.exports = auth;