const jwt = require('jsonwebtoken');

module.exports = {
  signToken: function (payload) {
    const token = jwt.sign(payload, process.env.JWT_SIGN, { expiresIn: '72h' });
    return token;
  },

  verifyToken: function (req, res, next) {
    const token = req.headers.Authorization || req.headers.authorization || '';
    if(!token) {
      return res.status(401).send({ message: 'Please authenticate'});
    } else if(token){
      jwt.verify(token, process.env.JWT_SIGN, (err, decoded) => {
        if(err){
          return res.status(500).json({ error: err, success: false, massege: "Invakid token" });
        } else if(decoded && decoded.id) {
            req.user = decoded;
            next();
        } 
      })
    }
  }
}