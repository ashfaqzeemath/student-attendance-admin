import { fetchWithBasic } from "./base.service";
import { BASE_API_URL } from "./constants/APIUrl";

export const postCourse = async (body) => {
    const response = await fetch("https://d6otawvpj7.execute-api.us-east-1.amazonaws.com/dev/add-course", {
      method: "POST",
      headers: {
        Accept: "/",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    return response;
};

export const getCourses = async () => {
  return fetchWithBasic (`${BASE_API_URL}/get-courses`);
};