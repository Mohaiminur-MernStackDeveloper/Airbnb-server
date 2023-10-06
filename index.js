const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 5000;

// midlewere is here
app.use(cors());
app.use(express.json());

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
        console.log(error);
      }
    });

    app.get("/iconiccities", async (req, res) => {
      try {
        const result = await restaurant
          .find({ category: "iconiccities" })
          .toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    app.get("/countryside", async (req, res) => {
      try {
        const result = await restaurant
          .find({ category: "countryside" })
          .toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    app.get("/topoftheworld", async (req, res) => {
      try {
        const result = await restaurant
          .find({ category: "topoftheworld" })
          .toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    app.get("/beach", async (req, res) => {
      try {
        const result = await restaurant.find({ category: "beach" }).toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    app.get("/luxe", async (req, res) => {
      try {
        const result = await restaurant.find({ category: "Luxe" }).toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });


    // filter modal data route is here
    app.post("/filterModalData", async (req, res) => {
      try {
        const reqData = req.body;
    
        // Create an array of filter objects for optional filters
        const optionalFilters = [
          { pricePerNight: { $gte: reqData.minValue, $lte: reqData.maxValue }},
          reqData.entirerplace ? { entireplace: reqData.entirerplace } : null,
          reqData.room ? { room: reqData.room } : null,
          reqData.sharedroom ? { sharedroom: reqData.sharedroom } : null,
          reqData.bedroom ? { bedroom: reqData.bedroom } : null,
          reqData.bed ? { bed: reqData.bed } : null,
          reqData.bathrooms ? { bathroom: reqData.bathrooms } : null,
          reqData.propertyHouse ? { propertyHouse: reqData.propertyHouse } : null,
          reqData.propertyApertment ? { propertyapartment: reqData.propertyApertment } : null,
          reqData.propertyGuestHouse ? { propertyguesthouse: reqData.propertyGuestHouse } : null,
          reqData.propertyHotel ? { propertyHotel: reqData.propertyHotel } : null,
        ].filter((filter) => filter !== null);
    
        // Create the aggregation pipeline
        const pipeline = [
          {
            $match: {
              pricePerNight: {
                $gte: reqData.minValue,
                $lte: reqData.maxValue,
              },
            },
          },
          // Add the optional filters to the pipeline using $and
          {
            $match: {
              $and: optionalFilters,
            },
          },
        ];
    
        // Execute the aggregation pipeline
        const result = await restaurant.aggregate(pipeline).toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
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
