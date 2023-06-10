const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 4000;

const jwtCheck = auth({
  audience: 'http://192.168.1.11:4000',
  issuerBaseURL: 'https://loveboard.uk.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);
//express middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}));


// add scopes https://auth0.com/docs/get-started/apis/scopes
// https://auth0.com/blog/introducing-oauth2-express-sdk-protecting-api-with-jwt/
/* app.get('/authorized', function (req, res) {
  console.log('new req ', req);
    res.send('Secured Resource');
}); */

//app.listen(port);

//console.log('Running on port ', port);


//all routes
const uploadFiles = require("../routes/uploadFiles");
const userData = require("../routes/userData");

//route middlewares
app.use("/api/v1",uploadFiles);
app.use("/api/v1",userData);

//config http server
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));


// ERRORS
// https://github.com/auth0/node-oauth2-jwt-bearer/issues/69




// https://blog.hao.dev/how-to-setup-single-page-applications-with-auth0-in-local-environment-without-cors-issues
// https://code.mendhak.com/angular-dynamic-configuration-with-auth0/
// https://auth0.com/blog/backend-for-frontend-pattern-with-auth0-and-dotnet/