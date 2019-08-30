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
        var cursor = filterFunction(database.collection(collectionName))
        cursor.each(onProcessCursorItem)
    }

    function filterFunction(collection) {
        return collection.find({})
    }

    function onProcessCursorItem(err, document) {
        if (hasError) {
            return
        }

        if (err !== null){
            hasError = true
            
            console.log("cursor error: " + err)
            return
        }

        if (document === null) {
            sendDocuments()
            return
        }

        documents.push(document)
    }

    function sendDocuments() {
        var body = {status: "ok", items: documents}
        var bodyString = JSON.stringify(body)

        callback(null, {statusCode: "200", headers: {"Access-Control-Allow-Origin": "*"}, body: bodyString})    
    }
};