require('dotenv').config();
const {MongoClient, ObjectId} = require('mongodb')
const uri = process.env['MONGO_URL'];
const dbClient = new MongoClient(uri)

let db = dbClient.db('PickupMtaani');
let agentsCollection = db.collection('pickupMtaani')
let adminConfigsCollection = db.collection('adminConfigs')


async function dbInit(){
    try {
        await dbClient.connect()
        console.log(`Db connected...`)
    } catch (error) {
        console.error(`Error connecting to database ${error}`)
    }

}

module.exports = {dbInit,agentsCollection,adminConfigsCollection}