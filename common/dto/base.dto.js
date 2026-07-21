import Joi from 'joi';

class BaseDto{
    static schema = Joi.object({}) // mujhe nahi pata wo kon use karega like object me name email validate karna hai ya phir self email pass verify so jobhi validate karna chahega wo is schema ko override kr dega

    static validate(data){
        const {error , value } = this.schema.validate(data, {
            abortEarly: false, 
            stripUnknown: true  //mene jo mangaya hai usse alawa jitne bhi field aye hai unko hata do (it can give ddos)
        })
        if(error){
            const errors = error.details.map((d)=>d.message);
            return {errors,value : null}
        }
        return {errors : null , value}
    }
}

export default BaseDto