import ApiError from "../../common/utils/api-error.js"
import { generatteResetToken } from "../../common/utils/jwt-utils.js";
import User from "./auth.models.js" //we do not call user scehma we call User always?




const register = async ({name, email, password, role})=>{
// do user registeration 
    const existing = await User.findOne({
        email
    })
    if(existing){
        throw ApiError.conflict("Email already Exists");
    }

    const {rawToken, hasheToken} = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken:hashedToken
    })

    //send an email to user with token : rawToken

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.verificationToken
    return userObj
}

export {register}

//so all logic is in service like controler passes request so services has logics like user is already present in db or not if not then create new if yes then login like this give 201 response like this