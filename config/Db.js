const mongoose=require("mongoose")
require("dotenv/config")
const conn= async()=>{ 
    try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`DB connected ....`)

    // const conn= mongoose.connection
    // conn.on("open", ()=>{
    //     console.log(`DB connected ....`)
    // })
    } catch (error) {
        console.log(`Error connecting to the Database`)
        console.log(error)
        process.exit(1)
    }
}

module.exports =conn