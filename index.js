const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jbkru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();


        // Connected Database ===================================================================
        const database = client.db('users');
        const userCollection = database.collection('members');


        // users get/create, post, update, delete ===============================================
        app.get('/members', async (req, res) => {
            const cursor = userCollection.find({});
            const product = await cursor.toArray();
            res.json(product);
            console.log(product)
        })


    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('client server site')
});

app.listen(port, (req, res) => {
    console.log('its listened')
})

