const express =require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt =require("bcryptjs")

const{blogmodel}=require("./models/blog")

const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://harshitha2001:harsh2001@cluster0.wludpyh.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

app.post("/signUp",async(req,res)=>{

    let input=req.body
    let hashedPassword=await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password=hashedPassword
    let blog=new blogmodel(input)
    await blog.save()

    res.json({"status":"success"})

})

app.listen(8081,()=>{
    console.log("server started")

})