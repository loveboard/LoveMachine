const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

//express middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}));

//all routes
const uploadFiles = require("./routes/uploadFiles");

//route middlewares
app.use("/api/v1",uploadFiles);

//config http server
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));