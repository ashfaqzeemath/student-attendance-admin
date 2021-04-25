import { fetchWithBasic } from "./base.service";
import { BASE_API_URL } from "./constants/APIUrl";

export const postLecturer = async (body) => {
    const response = await fetch("https://d6otawvpj7.execute-api.us-east-1.amazonaws.com/dev/add-user", {
      method: "POST",
      headers: {
        Accept: "/",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    return response;
};

export const getLecturer = async () => {
  return fetchWithBasic (`${BASE_API_URL}/get-lecturers`);
};
