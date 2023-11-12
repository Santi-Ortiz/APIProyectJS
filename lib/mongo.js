const {MongoClient, ServerApiVersion} = require("mongodb");
const config = require('../config');
const { query } = require("express");
const uri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@clusterapi.c9nwhuo.mongodb.net/?retryWrites=true&w=majority`;

class MongoDB{
    client;
    connection;
    constructor(){
        this.client = new MongoClient(uri, {
            serverApi: {    
                version: ServerApiVersion.v1,
                strict: true   
            }
        });
    }
    async connect(){
        return await this.client.connect();
    }

    async getAll(collection){
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return users.find();
    }

    async getOne(collection, query){
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return users.findOne(query);
    }

    async insertOne(collection, doc){
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return await users.insertOne(doc);
    }

    async deleteOne(collection, query){
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return await users.insertOne(query);
    }

    // Pendiente
    async updateOne(collection, filter, doc){
        const myDB = await client.db("API");
        const myColl = await myDB.collection(collection);
        
        const updateDocument = {
            $set: {
                rol: "El mas lindo del mundo",
            },
        };
        const result = await myColl.updateOne(filter, updateDocument);
    }
    //hacer el update, insert, delete
}

module.exports = MongoDB;