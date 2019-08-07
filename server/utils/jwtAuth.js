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
    }

    jwt.verify(token, process.env.JWT_SIGN, function (err, decoded) {
      if(decoded && decoded._id) {
        req.user = decoded;
        next();
      }
    })
  }
}