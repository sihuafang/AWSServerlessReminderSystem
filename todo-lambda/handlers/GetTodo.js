var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

module.exports  = (event, context, callback) => {
    var connectionString = "mongodb+srv://todo:todo123@cluster0-yc5ex.mongodb.net/test?retryWrites=true&w=majority"
    var collectionName = "todoDateBase"
    var hasError = false
    var documents = []
    
    connect(connectionString)

    
    function connect(connectionString) {
        MongoClient.connect(connectionString, onConnectedCallCompleted)    
    }

    function onConnectedCallCompleted(err, db) {
        if (err != null) {
            console.log(err)            
            return
        }
        
        onConnected(db)
    }

    function onConnected(db) {
        var _id = ObjectId(event._id)
        let database = db.db('todoDateBase');
        database.collection(collectionName).findOne({_id: _id}, onFindCallCompleted)
    }

    function onFindCallCompleted(err, result) {
        var newRecord = result
        var body = {}
        if (err != null) {
            callback(null, {statusCode: "500", headers: {"Access-Control-Allow-Origin": "*"}})
        }
        else {
            var body = {status: "ok", items: [newRecord]}
            var bodyString = JSON.stringify(body)
            console.log(result)
            callback(null, {statusCode: "200", headers: {"Access-Control-Allow-Origin": "*"}, body: bodyString})
        }
    }
};