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

        var todo = {}
        todo.name = event.name
        todo.description = event.description
        let database = db.db('todoDateBase');
        database.collection(collectionName).findOneAndUpdate({_id: _id}, {$set: todo}, onUpdateCallCompleted)
    }

    function onUpdateCallCompleted(err, result) {
        newRecord = result
        if (err != null) {
            callback(null, {status:"failed", error: message})
        }
        else {
            console.log(result)
            callback(null, {status:"success", message: "update completed"})
        }
    }
};