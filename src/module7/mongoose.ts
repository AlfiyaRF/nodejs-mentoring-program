import mongoose from 'mongoose';

const uri: string = 'mongodb://root:nodegmp@localhost:27017/mydatabase';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Succesfully connected to MongoDB");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
