const express = require("express");

const app = express();


app.get("/aa",(req,res)=>{

    console.log("啊啊啊啊啊");
});


app.listen(8000);