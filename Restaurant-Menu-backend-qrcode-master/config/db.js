import mongoose from 'mongoose';

const connectDB = async () => {
try {
  mongoose.set('strictQuery', false);
  const conn = await mongoose.connect(process.env.MONGO_URL, {
   useUnifiedTopology: true,
});
} catch (error) {
  console.log(`Error: ${error.message}`);
  process.exit(1);
  }
};

export default connectDB;
