import * as authService from "./auth.service.js"
import ApiResponse from "../../common/utils/api-response.js"
const register = async (req,res)=>{
    const user = await authService.register(req.body);
    ApiResponse.created(res,"registration success", user)

}

export {register}

//controller me no logic all bussiness logic is in services 
//this structure follows springbot , nestJs structure 