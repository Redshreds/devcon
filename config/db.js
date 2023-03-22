const mongoose = require('mongoose');
const PRODUCTION_CONFIG = require('PRODUCTION_CONFIG');
const db = PRODUCTION_CONFIG.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
