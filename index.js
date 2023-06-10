const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const fileUpload = require("express-fileupload");

// Import the required libraries
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config.json');

// Import the passport Azure AD library
const BearerStrategy = require('passport-azure-ad').BearerStrategy;

// Set the Azure AD B2C options
const options = {
  identityMetadata: `https://${config.credentials.tenantName}.b2clogin.com/${config.credentials.tenantName}.onmicrosoft.com/${config.policies.policyName}/${config.metadata.version}/${config.metadata.discovery}`,
  clientID: config.credentials.clientID,
  audience: config.credentials.clientID,
  issuer: config.credentials.issuer,
  policyName: config.policies.policyName,
  isB2C: config.settings.isB2C,
  scope: config.resource.scope,
  validateIssuer: config.settings.validateIssuer,
  loggingLevel: config.settings.loggingLevel,
  passReqToCallback: config.settings.passReqToCallback
}
// Instantiate the passport Azure AD library with the Azure AD B2C options
const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument
  done(null, {}, token);
}
);


// Use the required libraries
const app = express();

app.use(morgan('dev'));

// enforce on all endpoints
app.use(passport.initialize());

passport.use(bearerStrategy);

//enable CORS (for testing only -remove in production/deployment)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});



//express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp"
}));




// Add middleware to authenticate all requests
app.use((req, res, next) => {
  passport.authenticate('oauth-bearer', { session: false })(req, res, next);


  console.log('new request --> ID token: ', req.authInfo);
  // console.log('Validated claims: ', req.authInfo);

  // Service relies on the name claim.  
  //res.status(200).json({ 'name': req.authInfo['name'] });

});


//all routes
const uploadFiles = require("./routes/uploadFiles");
const userData = require("./routes/userData");
const dummyForTest = require("./routes/dummyForTest");



//route middlewares
app.use("/api/v1", uploadFiles);
app.use("/api/v1", userData);
app.use("/test/", dummyForTest);

// Starts listening on port 6000
const port = process.env.PORT || 6000;

app.listen(port, '0.0.0.0', () => {
  //console.log(`Server listening on Port ${PORT}`);
  console.log("Server listening on Port", port);
});



// ERRORS
// https://github.com/auth0/node-oauth2-jwt-bearer/issues/69




// https://blog.hao.dev/how-to-setup-single-page-applications-with-auth0-in-local-environment-without-cors-issues
// https://code.mendhak.com/angular-dynamic-configuration-with-auth0/
// https://auth0.com/blog/backend-for-frontend-pattern-with-auth0-and-dotnet/