import axios from "axios";

// API Key constant
const API_KEY = "AIzaSyDpINKDMubUdfvXdTY5yaHNVdE5RHizDlA";

// creating a separate authentiction fuction

async function authenticateFn(mode, userEmail, userPassword) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: userEmail,
    password: userPassword,
    returnSecureToken: true,
  });
return response.data.idToken
}

// Asynchronous function to get data for authentication
export async function createNewUser(userEmail, userPassword) {
  // sending data to authentication function
  return await authenticateFn("signUp", userEmail, userPassword);
}
// Asynchronous function login data
export async function login(userEmail, userPassword) {
  // sending data to authentication function
 return  await authenticateFn("signInWithPassword", userEmail, userPassword);
}
