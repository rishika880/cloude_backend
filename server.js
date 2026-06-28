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
app.get('/users',async(req,res)=>{
    const result= await pool.query('SELECT * FROM users')
    res.json(result.rows)
})
app.post('/users', async (req, res) => {
  const { name, age, college } = req.body
  const result = await pool.query(
    'INSERT INTO users (name, age, college) VALUES ($1, $2, $3) RETURNING *',
    [name, age, college]
  )
  res.json(result.rows[0])
})

// PUT - update a user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, age, college } = req.body
  const result = await pool.query(
    'UPDATE users SET name=$1, age=$2, college=$3 WHERE id=$4 RETURNING *',
    [name, age, college, id]
  )
  res.json(result.rows[0])
})

// DELETE - remove a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM users WHERE id=$1', [id])
  res.json({ message: 'user deleted successfully' })
})


app.listen(process.env.PORT || 3000, () => {
  console.log('server is running')
})
