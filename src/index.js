import dotenv from "dotenv"
import connectDB from './db/index.js';
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed!!!",err)
})

/*
(async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("erreor",(error)=>{
            console.error("ERRR", error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on the port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR", error)
        throw error
    }
})()
*/