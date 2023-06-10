const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 4000;

const jwtCheck = auth({
  audience: 'http://192.168.1.11:4000',
  issuerBaseURL: 'https://loveboard.uk.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);



// add scopes https://auth0.com/docs/get-started/apis/scopes
// https://auth0.com/blog/introducing-oauth2-express-sdk-protecting-api-with-jwt/
app.get('/authorized', function (req, res) {
  console.log('new req ', req);
    res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);


// ERRORS
// https://github.com/auth0/node-oauth2-jwt-bearer/issues/69




// https://blog.hao.dev/how-to-setup-single-page-applications-with-auth0-in-local-environment-without-cors-issues
// https://code.mendhak.com/angular-dynamic-configuration-with-auth0/
// https://auth0.com/blog/backend-for-frontend-pattern-with-auth0-and-dotnet/