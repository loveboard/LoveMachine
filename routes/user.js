
// express router for user data to save on mongodb database
const router = require("express").Router();
const { MongoClient } = require("mongodb");


// connect to mongodb and save document
const uri =     "mongodb+srv://loveuser:NgPBfDbs5rCVTWOl@clusterromanoff.n6wkh.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
router.post("/saveJson", async (req, res) => {
    try {
        await client.connect();
        const database = client.db("loveboard");
        const collection = database.collection("users");
        // create a document to be inserted
        const doc = { name: "test" };
        const result = await collection.insertOne(doc);
        console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`);
        res.send({message:"json saved successfully"});
    } finally {

        // Ensures that the client will close when you finish/error
        await client.close();
    }   
    /*     const {json} = req.body;

    console.log(json);
    res.send({message:"json saved successfully"}); */
});