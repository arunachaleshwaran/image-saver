import Express, { response } from "express";
import "../db/conn.js";
import { ObjectId } from "mongodb";
import multer from "multer";
import dbObject from "../db/conn.js";
import path from 'path'
const recordRoutes = Express.Router();

recordRoutes.get('/getimage', Express.static('./uploads'))
recordRoutes.post('/uploadimage', function (request, response) {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      let fileName = Date.now() + '-' + file.originalname
      callback(null, fileName);
      // add new entry to db
      let conn = dbObject.getDb()
      let newEntry = {
        image: fileName,
        // name: file.
      }
      let res = conn.collection('records').insertOne(newEntry, (err, res) => {
        if (err) throw err;
        response.status(200).send('added')
      })
      console.log(res)
    }
  });
  const upload = multer({ storage }).single('userPhoto');
  upload(request, response, function (err) {
    if (err) {
      return response.end("Error uploading file.");
    }
    response.end("File is uploaded");
  });
});

// get all image
recordRoutes.get('/allimage', (req, res) => {
  let conn = dbObject.getDb()
  conn.collection('records').find({}).toArray((err, result) => {
    if (err) throw err
    res.status(200).json(result)
  })
})

export default recordRoutes;