const express = require('express')
const redis = require('redis')
const client = redis.createClient()
const PORT = 5000
const app = express()

app.use(express.json())

const conn = async ()=>{
    try {
        await client.connect()
        console.log('redis connected')
    } catch (error) {
        console.log(error);
    }
   
}

conn()

app.post('/user', async (req, res)=>{
    const user = await client.set('user', JSON.stringify(req.body))
    res.status(200).json({
        success:true,
        data: user
    })
})
app.get('/user', async (req, res)=>{
    const user = await client.get('user')
    res.status(200).json(user)
})
app.delete('/user', async (req, res)=>{
    const user = await client.del('user')
    res.status(200).json(user)
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
