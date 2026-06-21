import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = expressAsyncHandler(async (req, res, next) => {
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401)
        throw new Error("User is not authorized or token is missing")
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = decoded.user
    next()
    if(!token){
        res.status(401)
        throw new Error("Token is missing or user is not authorized")
    }
})

export {validateToken}
