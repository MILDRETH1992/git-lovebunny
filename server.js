// Use Express
var express = require("express");
var methodOverride = require('method-override');
// Use body-parser
var bodyParser = require("body-parser");
// Use MongoDB
var mongodb = require("mongodb");
const mongoose = require('mongoose')
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The personas collection
// var PERSONA_COLLECTION = "Persona";
var PERSONA_COLLECTION = "personas";

// Create new instance of the express server
var app = express();

var Persona = require('./src/app/modelo/persona');


// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/angular";
app.use(express.static(distDir));
app.use(bodyParser.json());
app.use(methodOverride());

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// Cargamos los endpoints
// require('./src/app/routes.js')(app);
// Local database URI.
const LOCAL_DATABASE = "mongodb://127.0.0.1:27017/chat";
// Local port.
const LOCAL_PORT = 3120;

// Init the server
var db;
const connectDB = async () => {
    try{
        await mongoose.connect(LOCAL_DATABASE, {
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            useUnifiedTopology: true,
        });
        db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
        console.log("Connected successfully");
        });

        console.log('MongoDB successfully connected');
        // console.log('db: ', db);

        // console.log("Database connection done.");

        // Initialize the app.
        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });

    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

// Creation of connection
connectDB();


/*
mongodb.MongoClient.connect(LOCAL_DATABASE,
    function (error, client) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = client.db();
        console.log("Database connection done.");

        // Initialize the app.
        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });
*/
/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

/*  "/api/personas"
 *  GET: finds all personas
 */
app.get("/api/getpersonas", function (req, res) {
  // res.status(200).json({"test": "test"});

  // console.log('db: ', db);

    // db.collection(PERSONA_COLLECTION).find().toArray(function (error, data) {
    //     if (error) {
    //         manageError(res, err.message, "Failed to get personas.");
    //     } else {
            // res.status(200).json(data);
    //     }
    // });

    Persona.find().then((data) => {
      console.log('data: ', data);
      res.json(data);
    });


});

/*  "/api/personas"
 *   POST: creates a new product
 */
app.post("/api/login", function (req, res) {
    var datalogin = req.body;
    console.log('datalogin: ', datalogin);
    console.log('usuario:: ', datalogin.usuario);
    console.log('ip: ', datalogin.ip);
    Persona.findOne({ 'usuario': datalogin.usuario, 'ip': datalogin.ip }, 'nombre usuario ip').then((data) => {
      console.log('data: ', data);
      res.json(data);
    });
});

/*  "/api/personas/:id"
 *   DELETE: deletes product by id
 */
app.delete("/api/personas/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        db.collection(PERSONA_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}
