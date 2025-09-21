import mongoose from "mongoose";

const connection = {};

const dbConnect = async () => {
  if (connection?.isConnected) {
    console.log("Already connected to database", connection?.isConnected);
    return;
  }

  const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: "EventryDB",
  };

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, options);

    connection.isConnected = db.connections[0].readyState;

    console.log(">>>Connected to database<<<", connection?.isConnected);
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default dbConnect;
