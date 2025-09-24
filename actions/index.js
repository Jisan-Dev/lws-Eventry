"use server";

const { createUser, findUserByCredentials } = require("@/db/queries");
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

export { performLogin, registerUser };
