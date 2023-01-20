import { variables, headers } from "./../variables";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${variables.API_URL}/User`, { headers });
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    return await response.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const searchUsersByString = async (field) => {
  try {
    const response = await fetch(`${variables.API_URL}/User/search/${field}`, {
      headers,
    });
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    return await response.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserByUsername = async () => {};

export const postUser = async (user) => {
  try {
    const response = await fetch(`${variables.API_URL}/User`, {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    return await response.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const editUser = async (user) => {};

export const deleteUser = async (user) => {};
