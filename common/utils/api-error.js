class ApiError extends Error{
    constructor(statusCode , message){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this,this.constructor)
    }
    static badRequest(message = "BAD request"){
        return new ApiError(400,message);
    }
    static unauthorized(message = "you are unauthorized"){
        return new ApiError(401,message);
    }
    static conflict(message = "conflict - User already exists"){
        return new ApiError(409,message);
    }
}

export default ApiError

