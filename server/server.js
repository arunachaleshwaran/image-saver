import dotenv from "dotenv";
import 'dotenv/config';
import Express from "express";
import cors from "cors";
import recordRoutes from "./routes/record.js";
import dbObject from "./db/conn.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(recordRoutes);
// get driver connection
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbObject.connectToServer((err) => { if (err) console.error(err) });
  console.log(`Server is running on port: ${port}`);
});