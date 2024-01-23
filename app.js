const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser');

const {dbInit,agentsCollection,adminConfigsCollection} =require('./mongoConfig.js')
const app = express()
const PORT = 3500


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/toggleAvailability',async(req,res)=>{
    let {siteId} = req.query
    let {available} = req.body
    console.log(available)
    await adminConfigsCollection.updateOne({site:siteId},{$set:{isOn:available,}})
    res.json(null)
})

app.post('/api/config',async(req,res)=>{
    let {siteId} = req.query
    let {available,location} = req.body
    let deliveryPrice =210
    if(!location){
        location=''
        deliveryPrice=0
    }
    let town =location.split(':')[0]   
    available = available==='on'?true:false
    if(town=='Nairobi(CBD)'){
        deliveryPrice=120
    }
    try {
        await adminConfigsCollection.updateOne({site:siteId},{$set:{isOn:available,price:deliveryPrice}})
    } catch (error) {
        console.log(`Error updating the admin configuration`)
    }
    res.redirect('back')
})

app.get('/api/getConfig',async(req,res)=>{
    let {siteId} = req.query
    let doc = await adminConfigsCollection.findOne({site:siteId})
    if(!doc){
        let config ={
            site:siteId,
            isOn:true,
            price:'Not set',
        }
        await adminConfigsCollection.insertOne(config)
        res.json(config)
        return
    }
    res.json(doc)
})
app.get('/api/agents',async(req,res)=>{
    let {siteId} = req.query
    let doc = await adminConfigsCollection.findOne({site:siteId}) || {}
    if(doc.isOn==false){
        res.json([])
        return
    }
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