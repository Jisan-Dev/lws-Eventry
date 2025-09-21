import { EventModel } from "@/models/event-model";
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

export { getAllEvents, getEventById };
