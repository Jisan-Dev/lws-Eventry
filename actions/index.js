"use server";

import { createUser, findUserByCredentials, updateGoing, updateInterest } from "@/db/queries";
import dbConnect from "@/services/mongodbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const registerUser = async (formData) => {
  await dbConnect();
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
};

const performLogin = async (formData) => {
  try {
    await dbConnect();
    const credentials = {};
    credentials.email = formData.get("email");
    credentials.password = formData.get("password");
    const found = await findUserByCredentials(credentials);
    return found;
  } catch (error) {
    throw error;
  }
};

async function addInterestedEvent(eventId, authId) {
  try {
    await dbConnect();
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
  revalidatePath("/details/" + eventId);
}

async function addGoingEvent(eventId, auth) {
  try {
    await dbConnect();
    await updateGoing(eventId, auth?._id, auth?.name, auth?.email);
    revalidatePath("/");
    return true;
  } catch (error) {
    throw error;
  }
}

export { addGoingEvent, addInterestedEvent, performLogin, registerUser };
