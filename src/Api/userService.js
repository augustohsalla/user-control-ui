import { variables, headers } from "../variables";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${variables.API_URL}/user`, { headers });
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
    const response = await fetch(`${variables.API_URL}/user/search`, {
      body: JSON.stringify(field),
      method: "POST",
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

export const postUser = async (user) => {
  try {
    const response = await fetch(`${variables.API_URL}/user`, {
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

export const editUser = async (user) => {
  try {
    const response = await fetch(`${variables.API_URL}/user/${user.userName}`, {
      method: "PUT",
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

export const deleteUser = async (userName) => {
  try {
    const response = await fetch(`${variables.API_URL}/user/${userName}`, {
      method: "DELETE",
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
