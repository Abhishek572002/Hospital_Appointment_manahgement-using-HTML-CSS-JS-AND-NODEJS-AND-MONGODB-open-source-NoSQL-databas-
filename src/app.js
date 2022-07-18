var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://abhishek:O0v1DWaTG88bH48T@cluster0.l6osa.mongodb.net/?retryWrites=true&w=majority"
);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Database Connected");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// get method
app.get("/home", function (req, res) {
  return res.redirect("home.html");
});
app.get("/login", function (req, res) {
  return res.redirect("login.html");
});
app.get("/book_appointment", function (req, res) {
  return res.redirect("book_appointment.html");
});

app.post("/sign_up", function (req, res) {
  var name = req.body.pname;
  var phone = req.body.phone;
  var psymptom = req.body.psymptom;
  var date = req.body.date;
  var time = req.body.time;
  var doctor = req.body.dr;

  var data = {
    name: name,
    phone: phone,
    psymptom: psymptom,
    date: date,
    time: time,
    doctor: doctor,
  };

  db.collection("dentist").insertOne(data, function (err, collection) {
    if (!data) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("succes.html");
});
app.post("/sign_up2", function (req, res) {
  var name = req.body.pname;
  var phone = req.body.phone;
  var psymptom = req.body.psymptom;
  var date = req.body.date;
  var time = req.body.time;
  var doctor = req.body.dr;

  var data = {
    name: name,
    phone: phone,
    psymptom: psymptom,
    date: date,
    time: time,
    doctor: doctor,
  };

  db.collection("otolaryngo").insertOne(data, function (err, collection) {
    if (!data) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("succes.html");
});
app.post("/sign_up3", function (req, res) {
  var name = req.body.pname;
  var phone = req.body.phone;
  var psymptom = req.body.psymptom;
  var date = req.body.date;
  var time = req.body.time;
  var doctor = req.body.dr;

  var data = {
    name: name,
    phone: phone,
    psymptom: psymptom,
    date: date,
    time: time,
    doctor: doctor,
  };

  db.collection("pathology").insertOne(data, function (err, collection) {
    if (!data) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("succes.html");
});
app.post("/sign_up4", function (req, res) {
  var name = req.body.pname;
  var phone = req.body.phone;
  var psymptom = req.body.psymptom;
  var date = req.body.date;
  var time = req.body.time;
  var doctor = req.body.dr;

  var data = {
    name: name,
    phone: phone,
    psymptom: psymptom,
    date: date,
    time: time,
    doctor: doctor,
  };

  db.collection("orthopadiec").insertOne(data, function (err, collection) {
    if (!data) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("succes.html");
});
app.post("/sign_up5", function (req, res) {
  var name = req.body.pname;
  var phone = req.body.phone;
  var psymptom = req.body.psymptom;
  var date = req.body.date;
  var time = req.body.time;
  var doctor = req.body.dr;

  var data = {
    name: name,
    phone: phone,
    psymptom: psymptom,
    date: date,
    time: time,
    doctor: doctor,
  };

  db.collection("neurologist").insertOne(data, function (err, collection) {
    if (!data) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("succes.html");
});
app.post("/sign_up6", function (req, res) {
  var name = req.body.pname;
  var phone = req.body.phone;
  var psymptom = req.body.psymptom;
  var date = req.body.date;
  var time = req.body.time;
  var doctor = req.body.dr;

  var data = {
    name: name,
    phone: phone,
    psymptom: psymptom,
    date: date,
    time: time,
    doctor: doctor,
  };

  db.collection("gynaecologist").insertOne(data, function (err, collection) {
    if (!data) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("succes.html");
});

//contact us

app.post("/contactus", function (req, res) {
  var Fname = req.body.fullname;
  var PhoneNo = req.body.phonenumberwa;
  var Email = req.body.emailid;
  var Query = req.body.likhahoquery;

  var data = {
    Fname: Fname,
    PhoneNo: PhoneNo,
    Email: Email,
    Query: Query,
  };

  db.collection("Contact-Us").insertOne(data, function (err, collection) {
    if (!data) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("contactus.html");
});

// Register
const Register = require("./models/register");

app.post("/register", async (req, res) => {
  const { fname, lname, phone, email, psw, psw2 } = req.body;
  let user = await Register.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    if (psw === psw2) {
      const User = new Register({
        fname,
        lname,
        phone,
        email,
        psw,
        psw2,
      });
      await User.save();
      res.status(201).redirect("login");
    } else {
      ("password does not match");
    }
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, psw } = req.body;
    const usermail = await Register.findOne({ email: email });

    if (usermail.psw === psw) {
      res.status(201).redirect("book_appointment");
    } else {
      res.send("Eamil or Password are Incorrect");
    }
  } catch (error) {
    res.status(400).send("Invalid Login Details");
  }
});

app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("home.html");
  })
  .listen(5500);

console.log("server listening at port 5500");
