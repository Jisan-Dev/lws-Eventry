"use server";

import { revalidatePath } from "next/cache";

const { createUser, findUserByCredentials, updateInterest } = require("@/db/queries");
const { redirect } = require("next/navigation");

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

export { addInterestedEvent, performLogin, registerUser };
