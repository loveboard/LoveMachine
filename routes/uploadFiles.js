const router = require('express').Router();
const s3 = require("../utils/s3");

router.post("/upload",(req,res)=>{
    const file = req.files.file;
    s3.uploadToS3(file,(error,data)=>{
        //console.log("commit")
        if(error){
            return res.send({error:"Something went wrong."});
        }
        
        console.log("data "+data);      
        return res.send({message:"File uploaded successfully",url:data});
    });
});

router.get("/getFile",async (req,res)=>{
    try {
        let fileToSend = await s3.getFileFromS3('horizontal_tagline_on_white_by_logaster.jpeg');
        fileToSend.pipe(res);
    } catch (error) {
        res.send({error:"Server Error"});
    }
});

router.delete("/deleteFile",(req,res)=>{
    s3.deleteFileFromS3('horizontal_tagline_on_white_by_logaster.jpeg',(error,data)=>{
        if(error){
            return res.send({error:"Can not delete file, Please try again later"});
        }
        return res.send({message:"File has been deleted successfully"});
    });
});

module.exports = router;