const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Sample Data
const DataSchema = new Schema(
    {
        id: Number,
        message: String
    },
    { collection: 'users' }
);

// export the new Schema
module.exports = mongoose.model("Data", DataSchema);