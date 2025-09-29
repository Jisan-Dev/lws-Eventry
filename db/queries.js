import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import dbConnect from "@/services/mongodbConnect";
import emailjs from "@emailjs/nodejs";
import mongoose from "mongoose";

const getAllEvents = async () => {
  dbConnect();
  const allEvents = await EventModel.find();
  return allEvents;
};

const getEventById = async (eventId) => {
  dbConnect();
  const event = await EventModel.findById(eventId);
  return event;
};

const createUser = async (userData) => {
  return await UserModel.create(userData);
};

const findUserByCredentials = async (credentials) => {
  const userDb = await UserModel.findOne(credentials);
  if (userDb) {
    const user = { ...userDb.toObject({ getters: true }) }; // id(string type of _id) is a default getter
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
    console.log(event);
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
