import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: "backendapi",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
