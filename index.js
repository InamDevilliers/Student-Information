var express = require("express");
var app = express();

//const path = require('path');
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));

//var MongoClient = require('mongodb').MongoClient;
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (!err) {
        var server = app.listen(3005, function () {
            var port = server.address().port;
            console.log(
                "student app listening on port 3005! go to http://localhost:%s",
                port
            );
        });

        //alert("Database created!");

        app.get("/", function (req, res) {
            console.log("Welcome");
            res.send("We are Connected");
        });

        app.get("/index.html", function (req, res) {
            res.sendFile(__dirname + "/" + "index.html");
        });

        app.get("/stud_get", function (req, res) {
            //var newRec = req.query;
            var dbo = db.db("mydb");
            dbo.createCollection("customers", function (err, res) {
                if (err) throw err;
                console.log("Collection created!");
            });
            /* db.student.insert(newRec, function(err,doc)
                   { if(err)
              return console.log(err);
       
      else
                          res_status(201).json(doc.ops[1]);*/
            var myobj = {
                USN: req.query.usn,
                Name: req.query.name,
                sex: req.query.sex,
                Semester: req.query.sem,
                college: req.query.college,
                adhar: req.query.adhar,
                pass: req.query.pass_no,
                account: req.query.bank_acc,
            };
            dbo.collection("customers").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 docu inserted");
            });
            res.send(
                "<p>USN : " +
                req.query.usn +
                "</p><p>Name : " +
                req.query.namee +
                "</p><p>Sex : " +
                req.query.sex +
                "</p><p>Semester : " +
                req.query.sem +
                "</p><p>College : " +
                req.query.college +
                "</p><p>Addhar No. : " +
                req.query.adhar +
                "</p><p>passport No. : " +
                req.query.pass_no +
                "</p><p> Bank Account No : " +
                req.query.bank_acc +
                "</p>"
            );
        });
    } else db.close();
});
