require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   MongoDB
========================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* =========================
   Schema
========================= */

const DataSchema = new mongoose.Schema({}, { strict: false });

const BaseModel = mongoose.model("bases", DataSchema);

/* =========================
   Airtable Headers
========================= */

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`
};

/* =========================
   Fetch Bases
========================= */

app.get("/fetch-bases", async (req, res) => {

  try {

    const response = await axios.get(
      "https://api.airtable.com/v0/meta/bases",
      { headers }
    );

    const bases = response.data.bases;

    await BaseModel.deleteMany({});

    if (bases.length > 0) {
      await BaseModel.insertMany(bases);
    }

    res.json({
      count: bases.length,
      data: bases
    });

  } catch (err) {

    console.log(err.response?.data || err.message);

    res.status(500).send("Error fetching bases");
  }
});

/* =========================
   Get Bases
========================= */

app.get("/bases", async (req, res) => {

  const data = await BaseModel.find();

  res.json(data);
});

/* =========================
   Fetch Tables
========================= */

app.get("/tables/:baseId", async (req, res) => {

  try {

    const { baseId } = req.params;

    const response = await axios.get(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      { headers }
    );

    res.json(response.data.tables);

  } catch (err) {

    console.log(err.response?.data || err.message);

    res.status(500).send("Error fetching tables");
  }
});

/* =========================
   Fetch Records
========================= */

app.get("/records/:baseId/:tableName", async (req, res) => {

  try {

    const { baseId, tableName } = req.params;

    const response = await axios.get(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      { headers }
    );

    res.json(response.data.records);

  } catch (err) {

    console.log(err.response?.data || err.message);

    res.status(500).send("Error fetching records");
  }
});
app.get('/records/:baseId/:tableName', async (req, res) => {

  try {

    const { baseId, tableName } = req.params;

    const response = await axios.get(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`
        }
      }
    );

    const tables = response.data.tables;

    const table = tables.find(
      t => t.name === tableName
    );

    if (!table) {
      return res.status(404).json({
        error: 'Table not found'
      });
    }

    res.json(table.fields);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: 'Failed to fetch records'
    });
  }
});

/* =========================
   Root
========================= */

app.get("/", (req, res) => {
  res.send("Server Running");
});

/* =========================
   Start Server
========================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});