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
        var _id = ObjectId(event["queryStringParameters"]['id'])
        let database = db.db('todoDateBase');
        database.collection(collectionName).deleteOne({_id: _id}, onDeleteCallCompleted)
    }

    function onDeleteCallCompleted(err, result) {
        newRecord = result
        if (err != null) {
            console.log("error:" + err)
            callback(null, {status:"failed", error: err})
        }
        else {
            callback(null, {statusCode: "200",  headers: {"Access-Control-Allow-Origin": "*"}})

        }
    }
};