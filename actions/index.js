"use server";

import { createUser, findUserByCredentials, updateGoing, updateInterest } from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const registerUser = async (formData) => {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
};

const performLogin = async (formData) => {
  try {
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
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
}

async function addGoingEvent(eventId, auth) {
  try {
    await updateGoing(eventId, auth?.id, auth?.name, auth?.email);
    revalidatePath("/");
    return true;
  } catch (error) {
    throw error;
  }
}

export { addGoingEvent, addInterestedEvent, performLogin, registerUser };
