const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const { token } = req.cookies; // Ensure cookie-parser is used

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found, Not authenticated"
            });
        }

        const jwtverify = jwt.verify(token, process.env.JWT_SECRET);
        req.dataofuser = jwtverify; // Attach user data to request object

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Token unauthorized"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message // Log this in production
        });
    }
};
