import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base middleware:
export const requireSignIn = async (req, res, next) => {
  try {
    //validate or parse the cookie or token with the provided jwt-secretkey:
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //get the userId from the token: and send it with req:
    req.user = decode;
    //greet:
    console.log("hello from protected route middleware:");
    //call the next middleware:

    next();
  } catch (error) {
    console.log(
      "Error with the authMiddlewire's requireSignin function: ",
      error.message
    );
  }
};

//admin acceess middleware:
export const isAdmin = async (req, res, next) => {
  try {
    //fetch the user from request:
    const user = await userModel.findById(req.user._id);
    //check the user role:

    //not admin:
    if (user.role !== 1) {
      return res.status(200).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      //admin: call the next middleware function:
      //greet:
      console.log("yes admin");
      next();
    }
  } catch (error) {
    console.log(
      "internal server error , Error with authMiddleware's isadmin function:",
      error.message
    );
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
