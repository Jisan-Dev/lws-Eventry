import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import emailjs from "@emailjs/nodejs";
import mongoose from "mongoose";

const getAllEvents = async (query) => {
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
  const event = await EventModel.findById(eventId);
  return event;
};

const createUser = async (userData) => {
  return await UserModel.create(userData);
};

const findUserByCredentials = async (credentials) => {
  const userDb = await UserModel.findOne(credentials);
  if (userDb) {
    const user = JSON.parse(JSON.stringify(userDb));
    return user;
  }
  return null;
};

const updateInterest = async (eventId, authId) => {
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
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICEID,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID,
    formD,
    {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      privateKey: process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY,
    }
  );
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
