var MongoClient = require('mongodb').MongoClient

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
        let database = db.db('todoDateBase');
        database.collection(collectionName).insertOne(event, onInsertCallCompleted)
    }

    function onInsertCallCompleted(err, result) {
        newRecord = result
        if (err != null) {
            callback(null, {status:"failed", error: message})
        }
        else {
            callback(null, {status:"success", message: "insert completed"})
        }
    }
};