const router = require("express").Router();


router.get('/public', (req, res) => res.send( {'date': new Date() } ));


// get json from mongodb database
router.get('/hello', (req, res) => {
    console.log('Validated claims: ', req.authInfo);
    // Service relies on the name claim.  
    res.status(200).json({'name': req.authInfo['name']});
}
);


module.exports = router;
