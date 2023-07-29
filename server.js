const express=require("express")
const app =express()
const connectDb =require('./config/Db')
const taskRoute =require('./router/task')
app.use(express.json())

app.use("/v1/tasks", taskRoute)
// app.get('/',(req, res)=>{
//     res.send("I'm here...")
// })

connectDb()
const PORT =8000
app.listen(PORT, ()=>{
    console.log(`Server started...`)
})