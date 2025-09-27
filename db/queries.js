import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import dbConnect from "@/services/mongodbConnect";
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
  const user = { ...userDb.toObject({ getters: true }) }; // id(string type of _id) is a default getter
  if (user) {
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

export { createUser, findUserByCredentials, getAllEvents, getEventById, updateInterest };
