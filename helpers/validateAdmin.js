const validateAdmin = (req, res, next) => {
    try {
        const adminRole = process.env.SUPER_ADMIN; 

        const token = req.headers.authorization;
    
        const userRole = token.split(' ')[1];
    
        if (userRole !== adminRole) {
          return res.status(403).json({ message: 'Access denied' });
        }
    
        next();
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = validateAdmin;
  