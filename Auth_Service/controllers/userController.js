import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, password, email, role, phone, file } = req.body;

    // Basic validation
    if (!username || !password || !email || !role || !phone) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Username, email, and password are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      file, // handle file
    });

    res.status(201).json({
      success: true,
      error: false,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check for missing fields
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email, password, and role are required",
      });
    }

    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found with this email and role",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      error: false,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

//LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      error: false,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

// USER DETAILS
export const userDetails = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
