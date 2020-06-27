const mongoose = require("mongoose").set("debug", process.env.DEV_MODE);

const schemaHeart = new mongoose.Schema({
  hearts: { default: 0, type: Number, required: true },
  slug: {
    type: String,
    required: true,
  },
  submitted: { default: Date.now, type: Date, required: true },
  updated: { default: Date.now, type: Date, required: true },
});

export const hearts =
  mongoose.models.hearts || mongoose.model("hearts", schemaHeart);

let cachedDb = null;
export const connectMongoose = async () => {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  });

  // Cache the database connection and return the connection
  cachedDb = db;

  return db;
};
