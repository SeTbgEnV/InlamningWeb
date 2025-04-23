import { config } from "./config.js";

export const get = async (endpoint) => {
  const url = `${config.apiUrl}/${endpoint}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Det gick inte så bra ${response.status}, ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const post = async (url, data) => {
  try {
    const response = await fetch(`${config.apiUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
    return await response.json();
    }catch (error) {
      console.warn("Package is not Json:", error);
      return { success: true };
    }
  } catch (error) {
    console.error("Error posting:", error);
  }
}

export const patch = async (url, data) => {
  try {
    const response = await fetch(`${config.apiUrl}/${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating:", error);
  }
};

export const DELETE = async (url) => {
  try {
    const response = await fetch(`${config.apiUrl}/${url}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting:", error);
  }
  return await response.json();
};
