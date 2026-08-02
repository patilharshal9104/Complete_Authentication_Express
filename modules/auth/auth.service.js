import ApiError from "../../common/utils/api-error.js"
import { generateAccessToken, generateRefreshToken, generatteResetToken } from "../../common/utils/jwt-utils.js";
import User from "./auth.models.js" //we do not call user scehma we call User always?


const hasheToken = (token) => crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex")

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

const login = async ({email, password}) =>{
    //take email and final user in DB
    //then check if password is correct
    //check if verified or not

    const user = await User.findOne({email}).select("+password")
    if(!user) throw ApiError.unauthorized("Invalid email or password")
    

    //somehow  i will check password


    if(!user.isVerified){
        throw ApiError.forbidden("PLease verify you email before login")
    }

    const accessToken = generateAccessToken({id:user._id, role: user.role});
    const refreshToken = generateRefreshToken({id: user._id})

    user.refreshtoken = hasheToken(refreshToken)

    await user.save({validateBeforeSave: false})
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken
    


    return {user:userObj, accessToken, refreshToken}

}

const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("Refresh token missing");
  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) throw ApiError.unauthorized("User not found");

  if (user.refreshToken !== hashToken(token)) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });

  return { accessToken };
};

export {register}

//so all logic is in service like controler passes request so services has logics like user is already present in db or not if not then create new if yes then login like this give 201 response like this