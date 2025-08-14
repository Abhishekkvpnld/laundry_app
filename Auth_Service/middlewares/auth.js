import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies?.token || req.headers?.cookie;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "User not authenticated...🔐",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          error: true,
          message: "Invalid token...🔐",
        });
      }

      // Attach userId to the request object
      req.id = decoded.id;
      next();
    });
  } catch (error) {
    console.error("JWT Authentication Error: ", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Authentication Failed...🔐",
    });
  }
};