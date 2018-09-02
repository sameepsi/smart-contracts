var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);

app.get("/add", async(req,res)=>{

    res.redirect("add.html");
});


app.get("/update", async(req,res)=>{

    res.redirect("update.html");
});

app.get("/sensor", async(req,res)=>{

    res.redirect("sensor.html");
});

app.get("/start", async(req,res)=>{

    res.redirect("start.html");
});


app.get("/track", async(req,res)=>{

    res.redirect("track.html");
});


app.get("/receive", async(req,res)=>{

    res.redirect("receive.html");
});


app.get("/refund", async(req,res)=>{

    res.redirect("refund.html");
});
