import mongoose, { mongo } from "mongoose";
import {app} from './app';

// if no db is present then mongoose will create auth db
const start = async () => {
  // Do these checks as soon as instance goes live
  if (!process.env.JWT_KEY) {
    throw new Error("JWT Key not found");
  }
  if(!process.env.MONGO_URI){
    throw new Error("Mongo uri for auth not found")
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo db");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log("auth service listening on 3000 hell yeah");
});

start();
