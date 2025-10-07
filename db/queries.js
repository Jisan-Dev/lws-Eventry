import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import emailjs from "@emailjs/nodejs";
import mongoose from "mongoose";

const getAllEvents = async (query) => {
  dbConnect();
  // dbConnect();
  let allEvents = [];

  if (query) {
    // const regex = new RegExp(query, 'i'); // 'i' makes the search case-insensitive
    allEvents = await EventModel.find({ name: { $regex: query, $options: "i" } });
  } else {
    allEvents = await EventModel.find();
  }

  return JSON.parse(JSON.stringify(allEvents)); //we have to return plain object instead of mongo doc because nextjs cannot serialize mongo doc. getters:true to get id instead of _id(ObjectId). Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
};

const getEventById = async (eventId) => {
  // dbConnect();
  const event = await EventModel.findById(eventId);
  return JSON.parse(JSON.stringify(event));
};

const createUser = async (userData) => {
  return await UserModel.create(userData);
};

const findUserByCredentials = async (credentials) => {
  // dbConnect();
  const userDb = await UserModel.findOne(credentials);
  if (userDb) {
    const user = JSON.parse(JSON.stringify(userDb));
    return user;
  }
  return null;
};

const updateInterest = async (eventId, authId) => {
  // dbConnect();
  const event = await EventModel.findById(eventId);

  if (event) {
    const foundUser = event.interested_ids.find((id) => id.toString() === authId);

    if (foundUser) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    event.save();
    // console.log(event);
  }
};

const updateGoing = async (eventId, authId, authName, authEmail) => {
  // dbConnect();
  const event = await EventModel.findById(eventId);
  event.going_ids.push(new mongoose.Types.ObjectId(authId));
  event.save();
  const formD = {
    name: authName,
    from_name: "Eventry",
    email: authEmail,
    to_email: authEmail,
    event: event.name,
  };
  await emailjs.send(process.env.EMAILJS_SERVICEID, process.env.EMAILJS_TEMPLATEID, formD, {
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
  });
  console.log("SUCCESS!");
};

export {
  createUser,
  findUserByCredentials,
  getAllEvents,
  getEventById,
  updateGoing,
  updateInterest,
};
