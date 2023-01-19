import axios from "axios";

export default axios.create({
  baseURL: "https://api.tapatradie.com/backend/v2/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",

    
    
  },
});
