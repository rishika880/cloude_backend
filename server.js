const express=require('express')
const app=express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('hello my server is working')
})
app.get('/about',(req,res)=>{
    res.send('it is about page')
})
app.get('/user',(req,res)=>{
    res.json({"name":"rishika","age":21,"college":"vaagdevi"})
})
app.listen(3000,()=>{
    console.log('server is running in the localaddress 3000')
})