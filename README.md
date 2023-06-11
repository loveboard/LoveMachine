# LoveMachine
LoveBoard BackEnd API



https://stackoverflow.com/a/51997807/13660151




How can I get a public permanent link of an image stored on a s3bucket?

const AWS = require('aws-sdk');
const s3Client = new AWS.S3();

const params = {
  Bucket: 'your-bucket-name',
  Key: 'your-object-key',
  ACL: 'public-read'
};

s3Client.putObject(params, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`File uploaded successfully. URL: ${data.Location}`);
  }
});

set s3 object to be readable from an application only








FrontEnd
    FlutterApp
        flutter_appauth
            oauth2 user login handling using AzureAD B2C
        dashboard
            board handling

    questions
        auth
            for some reason is not loading the refresh token

        dashboard
            if the item inside dahsboard doesnt have a token or is null create a new one, lets make it simple


BackEnd

    Auth (Azure AD B2C)
        morgan
        passport
        passport-azure-ad
    
    Storage
        S3 (TebiS3)
            aws-sdk/client-s3
        MongoDB (MongoDB Atlas)
            mongodb
        

LoveBoard Storage (Tebi S3)
    Users
        userid
            profile
                board in json format inside user s3 folder
                    references to photos inside user s3 folder
            media
                photos



User
    AzureAD B2C -> Security
    mongodb -> userdata
        references to s3 folder
    TebiS3
        folder for user
            board in json format inside user s3 folder
                references to photos inside user s3 folder
            media
                photos
