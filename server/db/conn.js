import { MongoClient } from "mongodb"
// const { MongoClient } = require('mongodb');

const Db = process.env.URI || "";
console.log(Db)
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var _db;

const dbObject = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (db) {
        _db = db.db("myFirstDatabase");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },
  getDb: () =>_db
};
export default dbObject;