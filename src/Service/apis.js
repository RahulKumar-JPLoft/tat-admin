import axios from "axios";

// http://3.109.98.222:3349/backend/v2/
// https://api.tapatradie.com/backend/v2/
export default axios.create({
  baseURL: "http://3.109.98.222:3349/backend/v2/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
