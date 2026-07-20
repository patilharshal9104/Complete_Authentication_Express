//start file 

import "dotenv/config"
import app from "./src/app.js" 
import connectDB from "./common/config/db.js"

const PORT = process.env.PORT || 5000   


const start =  async()=>{
    await connectDB()
    app.listen(PORT , ()=>{
  
        console.log(`Server is runnning at ${PORT} in ${process.env.NODE_ENV} mode`)
    })
}

start().catch((err)=>{
    console.log("Failed to start server")
})


