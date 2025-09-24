import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import dbConnect from "@/services/mongodbConnect";

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
  const user = await UserModel.findOne(credentials).lean();
  if (user) {
    return user;
  }
  return null;
};

export { createUser, findUserByCredentials, getAllEvents, getEventById };
