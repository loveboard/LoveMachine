const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const { Buffer } = require('buffer');
const config = require('../config.json');
const mime = require('mime-types');

//const aws = require('aws-sdk');
//const { Endpoint } = require('aws-sdk');

const { S3Client } = require("@aws-sdk/client-s3");
const { ListBucketsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl,getSignedUrlPromise } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

//configure the aws environment
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "WdxLV84T6ue4koiz", //,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "I5OX5KfYSfGLylvuEd1QwJFGaLvmmJN8qBYCRlXv",
};

//initialize s3
//const s3 = new aws.S3();
// Create an S3 service client object.
const s3Client = new S3Client({
  endpoint: config.s3.endpoint,
  name: config.s3.name,
  credentials: credentials,
  region: "global",
});

//constant params
/* const constantParams = {
    Bucket: process.env.AWS_BUCKET_NAME || 'loveboard',
    Endpoint: process.env.AWS_BUCKET_ENDPOINT || 'https://s3.tebi.io',
}  */

//upload file to s3 bucker
exports.uploadToS3 = (file, next) => {

  // upload s3 object to be readable from an application only and generate a permanent link

  console.log(file);

  console.log("uploading file to s3 bucket");

  var randomFileNameAndUniqueUUID = require('uuid').v4()+path.extname(file.name);
  console.log("file name "+randomFileNameAndUniqueUUID);
  const fileStream = fs.createReadStream(file.tempFilePath);

  //const parsedUrl = url.parse(file.);
  //const extension = path.extname(file.tempFilePath);
  
  //console.log(`The file extension is: ${extension}`);
  //console.log(`The file.tempFilePath is: ${file.tempFilePath}`);

  s3Client.send(
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: randomFileNameAndUniqueUUID,
      //Body: file.data,
      //Body: Buffer.from(file.data, 'base64'),
      Body: fileStream,
      ACL: 'authenticated-read'
    })
  )
  .then(async (error, data) => {
    //console.log(error);
    console.log(error, data);

    // Generate a presigned URL
    const get_command = new GetObjectCommand({
      Bucket: config.s3.bucket,
      //endpointProvider: config.s3.endpoint,
      Key: randomFileNameAndUniqueUUID,
      //ResponseContentDisposition: 'attachment; filename="' + file.name + '"',
    });
    //const url = await getSignedUrl(s3Client, get_command, { expiresIn: 3600 });
    //const url = await getSignedUrl('getObject', get_command);
    
    //const url = awaits3Client.getSignedUrl('getObject', get_command);
    const url = await getSignedUrl(s3Client, get_command);


    console.log(url);      
    next(false,url);
  }).catch((error) => {
    console.log(error);
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
