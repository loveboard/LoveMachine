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








/* 

if the user doest have a folder inside the bucket create a new one inside the folder users of the root folder with the name of an random and unique uuid




const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

const s3Client = new S3Client({ region: 'your-region' });

const bucketName = 'your-bucket-name';
const folderName = 'users';
const uuid = uuidv4();
const folderKey = `${folderName}/${uuid}/`;

const params = {
  Bucket: bucketName,
  Key: folderKey,
  Body: ''
};

const command = new PutObjectCommand(params);

try {
  const response = await s3Client.send(command);
  console.log(`Folder created successfully: ${folderKey}`);
} catch (err) {
  console.log(err);
}


How can I check if a folder exists in an S3 bucket using the @aws-sdk/client-s3 module in JavaScript?

const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: 'your-region' });

const bucketName = 'your-bucket-name';
const folderKey = 'your-folder-key/';

const params = {
  Bucket: bucketName,
  Key: folderKey
};

const command = new HeadObjectCommand(params);

try {
  const response = await s3Client.send(command);
  console.log(`Folder exists: ${folderKey}`);
} catch (err) {
  if (err.code === 'NotFound') {
    console.log(`Folder does not exist: ${folderKey}`);
  } else {
    console.log(err);
  }
}
*/

















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
