import mongoose, { mongo } from "mongoose";
import {app} from './app';
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";

// if no db is present then mongoose will create auth db
const start = async () => {
  // Do these checks as soon as instance goes live
  if (!process.env.JWT_KEY) {
    throw new Error("JWT Key not found");
  }
  if(!process.env.MONGO_URI){
    throw new Error("Mongo uri not found");
  }
  if(!process.env.NATS_URL){
    throw new Error("NATS uri not found");
  }
  if(!process.env.NATS_CLUSTER_ID){
    throw new Error("Nats cluster id not found");
  }
  if(!process.env.NATS_CLIENT_ID){
    throw new Error("Nats client id not found");
  }
  try {
    //client id (2nd parameter) should be unique
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!!!')
      process.exit()
    });
    process.on('SIGINT', () => natsWrapper.client.close()); 
    process.on('SIGTERM', () => natsWrapper.client.close());
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo db");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log("tickets service listening on 3000 hell yeah");
});

start();
