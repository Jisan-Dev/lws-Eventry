import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  location: {
    required: true,
    type: String,
  },
  imageUrl: {
    required: true,
    type: String,
  },
  interested_ids: {
    required: false,
    type: Array,
  },
  going_ids: {
    required: false,
    type: Array,
  },
  swags: {
    required: false,
    type: Array,
  },
});

export const EventModel = mongoose.models.Event ?? mongoose.model("Event", eventSchema);
