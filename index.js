const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 5000;

// midlewere is here
app.use(cors());

const uri = `mongodb+srv://${process.env.Mongodb_username}:${process.env.Mongodb_password}@cluster0.85env82.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Databaseconnection is here
    const Database = client.db("Airbnb");
    const restaurant = Database.collection("restaurant");

    // All route is here

    // get all data route is form here
    app.get("/alldata", async (req, res) => {
      try {
        const result = await restaurant.find().toArray();
        res.send(result);
      } catch (error) {
        console.log("all data route is not working properly!");
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// default route is here
app.get("/", (req, res) => {
  res.send("Airbnb server is running well");
});

// app listen is here
app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
