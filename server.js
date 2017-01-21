var express = require("express");
var http = require("http");
var moment = require("moment");
var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/index.html", function(req, res){
  //res.writeHead(200,{ "Content-Type": "text/html" });
  res.render("index");
});

app.get("/:q", function(req, res){
  res.writeHead(200,{ "Content-Type": "application/json" });  
  var dt  = moment(req.params.q,['X','MMMM D, YYYY']);
  if (dt.isValid()){
    var ret = {
        unix: dt.format('X'),
        natural: dt.format('MMMM D, YYYY')
      };
      res.end(JSON.stringify(ret));    
  } else {
    res.end(JSON.stringify(null));
  }
});

http.createServer(app).listen(process.env.PORT);