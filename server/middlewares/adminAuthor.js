const jwt = require('../helpers/jwt');

module.exports = (req, res, next) => {
  let decoded = jwt.verify(req.headers.token);
  if (decoded.role !== 'admin') {
    res.status(401).json({ message: 'unauthorized to access' });
  } else {
    next();
  }
}