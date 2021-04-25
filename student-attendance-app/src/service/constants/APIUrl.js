
export const BASE_API_URL = "https://d6otawvpj7.execute-api.us-east-1.amazonaws.com/dev"
//export const BASE_APP_URL = process.env.BASE_APP_URL;

//AUTH
export const API_AUTH_SIGN_UP = `${BASE_API_URL}/api/auth/sign-up`;
export const API_AUTH_SIGN_IN = `${BASE_API_URL}/signin-cognito`;
export const API_AUTH_REFRESH = `${BASE_API_URL}/api/auth/refresh-token`;

//HOTEL
export const API_LECTURER = `${BASE_API_URL}/api/agent`;
export const API_HOTEL_TOP = `${BASE_API_URL}/api/hotel/top`;
export const API_HOTEL = `${BASE_API_URL}/api/hotel`;
export const API_HOTEL_SINGLE = `${BASE_API_URL}/api/hotel/single`;
export const API_LOCATION = `${BASE_API_URL}/api/location`;