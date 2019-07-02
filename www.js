var express = require('express')
var fs = require('fs')
var https = require('https')
var app = express()
const ejs = require('ejs')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var bodyParser = require('body-parser');
var port     = process.env.PORT || 3000;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var User = require('./models/user')
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'patient'; // Database Name
var loginstat;
const findDocuments = function(db, callback) {
  // Get the documents collection

}

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/login", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var user = req.body.user;
  var pass = req.body.pass;
  console.log("Loginname: " + user + " Passwort: " + pass);
  function checklogindata(user, pass, err){
    
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('fcol');
    // Find some documents
    collection.find({ 'username': user, 'password': pass }).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      if (docs == "") {
        client.close();
        loginstat = 0;
        console.log("Benutzernahme oder Passwort falsch")
          res.send(JSON.stringify({
    loginmessage: "loginfail"
    
  }));
      }
      else {
        collection.updateOne({"username":user},{$set:{"SessionID":req.session.id}})
        client.close();
        loginstat = 1;
        console.log("Login erfolgreich")
        req.session["user"]=docs[0];
        req.session.user.password = "";
        console.log("Session ID:" + req.session.id + " " + req.session.user.username);
          res.send(JSON.stringify({
    loginmessage: "loginsucces"
    
  }));
      }

      
    });
  });
}
  checklogindata(user,pass);
  



})

app.post("/getoldtests", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var userid = req.body.userid;
  function getoldtests(userid, err){
    
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('usertests');
    // Find some documents
    collection.find({"userid":userid}).count( function(err, count) {
      assert.equal(err, null);
collection.find({ 'userid': userid}).toArray(function(err, docs) {
      assert.equal(err, null);
                res.send(JSON.stringify({
    amountoldtests: count,
    oldtests: docs
    
  }));
        client.close();
});



      
    });
  });
}
  getoldtests(userid);
  



})

app.post("/registeruser", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var user = req.body.user;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var pass = req.body.pass;
  var mail = req.body.mail;
  var dbirth = req.body.dbirth;
  var mbirth = req.body.mbirth;
  var ybirth = req.body.ybirth;
  var gender = req.body.gen;
  var pbirth = req.body.pbirth;
  function checklogindata(user, fname, lname, pass, mail, dbirth, mbirth, ybirth, err){
    
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('fcol');
    collection.find({ 'username': user}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      if (docs == "") {
        var collectioncount
              collection.count(function(err, count) {
        assert.equal(null, err);
        collectioncount = count+1;
        console.log(collectioncount)
         var patient = { username: user, firstname: fname, lastname: lname, password: pass, email: mail, dayob: dbirth, monthob: mbirth, yearob: ybirth, gend: gender, placebirth: pbirth, userid: collectioncount };
         collection.insertOne(patient, function(err, res) {
    if (err) throw err;
    console.log("Benutzer registriert");
      client.close();
        console.log("Registrierung erfolgreich")

  });
});
       
                res.send(JSON.stringify({
    registermessage: "registersucces"
    
  }));
      }
      else {
        client.close();
        console.log("Registrierung fehlgeschlagen, Benutzername bereits vergeben")
          res.send(JSON.stringify({
    registermessage: "registerfailuser"
    
  }));
      }

      
    });
  });
}
  checklogindata(user, fname, lname, pass, mail, dbirth, mbirth, ybirth);
  



})

app.post("/changeuserdata", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var user = req.body.username;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var pass = req.body.pass;
  var mail = req.body.mail;
  var dbirth = req.body.dbirth;
  var mbirth = req.body.mbirth;
  var ybirth = req.body.ybirth;
  var gender = req.body.gen;
  var pbirth = req.body.pbirth;
  var useri = req.body.userid;
  var changepass = req.body.changepassword;
  function checklogindata(user, fname, lname, pass, mail, dbirth, mbirth, ybirth, err){
    
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('fcol');
    collection.find({ 'username': user}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
        var collectioncount
              collection.count(function(err, count) {
        assert.equal(null, err);
        collectioncount = count+1;
        console.log(collectioncount)
        if(changepass == 1) {
                   var patient = { username: user, firstname: fname, lastname: lname, password: pass, email: mail, dayob: dbirth, monthob: mbirth, yearob: ybirth, gend: gender, placebirth: pbirth, userid: useri, SessionID: "" };
         collection.updateOne({username: user}, {$set: patient }, function(err, res) {
    if (err) throw err;
      client.close();
  });
        } else {
                   var patient = { username: user, firstname: fname, lastname: lname, email: mail, dayob: dbirth, monthob: mbirth, yearob: ybirth, gend: gender, placebirth: pbirth, userid: useri, SessionID: "" };
         collection.updateOne({username: user}, {$set: patient }, function(err, res) {
    if (err) throw err;
      client.close();
  });
        }

});
       
                res.send(JSON.stringify({
    usermessage: "usersucces"
    
  }));
    });
  });
}
  checklogindata(user, fname, lname, pass, mail, dbirth, mbirth, ybirth);
  



})



app.use(express.static('public'));
app.set('view engine', ejs); // set the view engine to ejs
// index page 
app.get('/', function(req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('fcol');
    // Find some documents
    collection.find({ 'name': "Haupt" }).toArray(function(err, docs) {
      assert.equal(err, null);
      res.render('index.ejs', { test: (docs[0].vorname) });
      client.close();
    });
  });
});

// register page 
app.get('/register', function(req, res) {
   res.render('register.ejs');
  
  
});

// change user data page 
app.get('/changeuserdata', function(req, res) {
   res.render('changeuserdata.ejs');
  
  
});

// overview page
app.get('/overview', function(req, res) {
   res.render('overview.ejs');
  
  
});

// old page
app.get('/old', function(req, res) {
   res.render('old.ejs');
  
  
});

// user page
app.get('/user', function(req, res) {
   res.render('user.ejs');
  
  
});

// test page
app.get('/test', function(req, res) {
   res.render('test.ejs');
  
  
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(4443, function() {
    console.log('Server wurde gestartet')
  })
  
  app.post("/asksession", function(req, res) {
  res.setHeader("Content-Type", "application/json");
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('fcol');
    // Find some documents
    collection.find({ 'SessionID': req.session.id }).toArray(function(err, docs) {
      assert.equal(err, null);
      client.close();
      if(docs != "") {
        console.log("Session ID:" + req.session.id + " " + req.session.user.username);
        res.send(JSON.stringify({
    sessionmessage: "succes",
    userdata: req.session.user
    
  }));
      } else {
         res.send(JSON.stringify({
    sessionmessage: "nosession"
    
  }));
      }
    });
    
  });

})

  app.post("/logout", function(req, res) {
  res.setHeader("Content-Type", "application/json");
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('fcol');
    // Find some documents
    collection.updateOne({"SessionID":req.session.id},{$set:{"SessionID":""}});
      assert.equal(err, null);
      client.close();
        res.send(JSON.stringify({
    logoutmessage: "succes",
    
  }));
    
  });

})

  app.post("/gettestorientation", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var questionsorientation;
  
 MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collectionorientation = db.collection('questionsorientation');
    // Find some documents
    
    collectionorientation.count( function(err, count) {
      assert.equal(err, null);
      var counter = [];
      console.log(count);
      for(var i=0;i<10;i++) {
        counter[i] = Math.round(Math.random() * (count - 1) + 1);

          for(var j=0;j<i;j++) {
            if(counter[j]==counter[i]) {
              counter[i] = Math.round(Math.random() * (count - 1) + 1);
              j=-1;
            }
          }
        

        
      }
       for(i=0;i<10;i++) {
         console.log(counter[i]);
       }
                  collectionorientation.find( {$or: [ { "id":counter[0] }, { "id":counter[1] }, { "id":counter[2] }, { "id":counter[3] }, { "id":counter[4] }, { "id":counter[5] }, { "id":counter[6] }, { "id":counter[7] }, { "id":counter[8] }, { "id":counter[9] } ] }).toArray(function(err, docs) {
      assert.equal(err, null);
      questionsorientation = docs;
               client.close();
    res.send(JSON.stringify({
    questions: questionsorientation
    
  }));
});
      





      
    });
  });

})

  app.post("/gettestobjects", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var cobjects;
  
 MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collectionobjects = db.collection('questionsobjects');
    // Find some documents
    
 collectionobjects.count( function(err, count) {
      assert.equal(err, null);
      var counter = [];
      console.log(count);
      for(var i=0;i<3;i++) {
        counter[i] = Math.round(Math.random() * (count - 1) + 1);

          for(var j=0;j<i;j++) {
            if(counter[j]==counter[i]) {
              counter[i] = Math.round(Math.random() * (count - 1) + 1);
              j=-1;
            }
          }
        

        
      }
       for(i=0;i<3;i++) {
         console.log(counter[i]);
       }
                  collectionobjects.find( {$or: [ { "id":counter[0] }, { "id":counter[1] }, { "id":counter[2] } ] }).toArray(function(err, docs) {
      assert.equal(err, null);
      cobjects = docs;
               client.close();
    res.send(JSON.stringify({
    objects: cobjects
    
  }));
});
      





      
    });
  });

})

 app.post("/gettestspeak", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var questionsspeak;
  
 MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collectionspeak = db.collection('questionsspeak');
    // Find some documents
    
    collectionspeak.count( function(err, count) {
      assert.equal(err, null);
      var counter = [];
      console.log(count);
      for(var i=0;i<9;i++) {
        counter[i] = Math.round(Math.random() * (count - 1) + 1);

          for(var j=0;j<i;j++) {
            if(counter[j]==counter[i]) {
              counter[i] = Math.round(Math.random() * (count - 1) + 1);
              j=-1;
            }
          }
        

        
      }
       for(i=0;i<9;i++) {
         console.log(counter[i]);
       }
                  collectionspeak.find( {$or: [ { "id":counter[0] }, { "id":counter[1] }, { "id":counter[2] }, { "id":counter[3] }, { "id":counter[4] }, { "id":counter[5] }, { "id":counter[6] }, { "id":counter[7] }, { "id":counter[8] } ] }).toArray(function(err, docs) {
      assert.equal(err, null);
      questionsspeak = docs;
               client.close();
    res.send(JSON.stringify({
    questions: questionsspeak
    
  }));
});
      





      
    });
  });

})

 app.post("/writeusertest", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  
  var testergebniss = req.body;
  console.log(testergebniss.math);
  var userid = testergebniss.userid;
 MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('usertests');
    // Find some documents
    
    collection.find({"userid":userid}).count( function(err, count) {
      assert.equal(err, null);
      testergebniss.no = count+1;
         collection.insertOne(testergebniss, function(err, res) {
    if (err) throw err;
      client.close();

  });



      
    });
  });
    res.send(JSON.stringify({
    testmessage: "saved"
    
  }));
})

