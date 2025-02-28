const methodNotAllowed = (req, res,next) => {
    res.status(405).json({ message: "Method Not Allowed" });
    next();
  };
  
  module.exports = methodNotAllowed;
  