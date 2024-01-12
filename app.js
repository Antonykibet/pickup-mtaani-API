const express = require('express')
const cors = require('cors')
const {dbInit,agentsCollection} =require('./mongoConfig.js')
const app = express()
const PORT = 5500

app.use(cors())

app.get('/api/agents',async(req,res)=>{
    let agents = await agentsCollection.find().toArray()
    res.json(agents)
})
app.get('/api/agents/:location',async(req,res)=>{
    let agents = await agentsCollection.findOne({location:req.params.location})
    res.json(agents)
})

app.listen(PORT,async()=>{
    try {
        await dbInit();
        console.log(`App is listening at port ${PORT}`)
    } catch (error) {
        console.error(error)
    }
})