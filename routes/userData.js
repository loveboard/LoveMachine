const router = require("express").Router();
const { MongoClient } = require("mongodb");

// connect to mongodb and save document

const uri =
  "mongodb+srv://luca:c0VN2cmJNKZTc84E@clusterromanoff.n6wkh.mongodb.net/test";
const client = new MongoClient(uri);

// save json to mongodb database
router.post("/saveJson", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("loveboard");
    const collection = database.collection("json");
    // create a document to be inserted
    const doc = { name: "test" };
    const result = await collection.insertOne(doc);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    res.send({message:"json saved successfully"});
  }
  /*     const {json} = req.body;
    console.log(json);
    res.send({message:"json saved successfully"}); */
});


// get json from mongodb database
router.get("/getJson", (req, res) => {
  res.send({ message: "json saved successfully" });
});

// delete json from mongodb database
router.delete("/deleteJson", (req, res) => {
  res.send({ message: "json saved successfully" });
});

router.post("/setUser", (req, res) => {});

router.get("/getUser", async (req, res) => {});

router.delete("/deleteUser", (req, res) => {});

module.exports = router;
