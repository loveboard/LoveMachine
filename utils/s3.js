const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
//const aws = require('aws-sdk');
//const { Endpoint } = require('aws-sdk');

const { S3Client } = require("@aws-sdk/client-s3");
const { ListBucketsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

//configure the aws environment
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, //,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

//initialize s3
//const s3 = new aws.S3();
// Create an S3 service client object.
const s3Client = new S3Client({
  endpoint: process.env.AWS_BUCKET_ENDPOINT,
  credentials: credentials,
  region: "global",
});

//constant params
const constantParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Endpoint: process.env.AWS_BUCKET_ENDPOINT,
} 

//upload file to s3 bucker
exports.uploadToS3 = (file, next) => {
  const fileStream = fs.createReadStream(file.tempFilePath);

  /*     const params = {
        ...constantParams,
        Body:fileStream,
        Key:file.name
    };
    s3.upload(params,(error,data)=>{
        console.log(error,data);
        next(error,data);
    }); */
  // Upload a file
  s3Client
    .send(
      new PutObjectCommand({
        Bucket: constantParams.Bucket,
        Key: file.name,
        Body: fileStream,
      })
    )
    .then(async (error, data) => {
      //console.log(error, data);

      // Generate a presigned URL
      const get_command = new GetObjectCommand({
        Bucket: constantParams.Bucket,
        Key: file.name,
        //ResponseContentDisposition: 'attachment; filename="YOUR_FILENAME.PNG"',
      });
      const url = await getSignedUrl(s3Client, get_command, { expiresIn: 3600 });
      //console.log(url);      
      next(false,url);
    });
};

//download file from s3 bucket
exports.getFileFromS3 = (key) => {
  const downloadParams = {
    Key: key,
    ...constantParams,
  };
  return s3.getObject(downloadParams).createReadStream();
};

//delete file from s3 bucker
exports.deleteFileFromS3 = (key, next) => {
  const deleteParams = {
    Key: key,
    ...constantParams,
  };
  s3.deleteObject(deleteParams, (error, data) => {
    next(error, data);
  });
};
