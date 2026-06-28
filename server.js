require('dotenv').config()
const express=require('express')
const pool=require('./db')
const app=express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('hello my server is working')
})
app.get('/about',(req,res)=>{
    res.send('it is about page')
})
app.get('/user',async(req,res)=>{
    const result= await pool.query('SELECT * FROM users')
    res.json(result.rows)
})
app.listen(3000,()=>{
    console.log('server is running in the localaddress 3000')
})