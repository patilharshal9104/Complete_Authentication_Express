//######new

import { verify } from "jsonwebtoken";
import ApiError from "../../common/utils/api-error";

import User from "./auth.models.js"

const authenticate = async(req,res,next)=>{
    //we are getting token so ask gpt that we are gone to postman and he said like you can send some tokens bearere then token and you can get this by doing that-> 
    //and we are not getting from cookies if you want you have to add some extra things 
    let token;
    if(req.headers.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        throw ApiError.unauthorized("Not authenticated")
    }
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);
    if(!user) throw ApiError.unauthorized("User no longer exists!!")
    
    req.user = {
        id: user._id,
        role:user.role,
        name:user.name,
        email:user.email
    };
    next();
}

const authorize = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            throw ApiError.forbidden(
                "You do not have permission to perfom this action"
            )
        }
        next();
    }
}

export {authenticate, authorize};