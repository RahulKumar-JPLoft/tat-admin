// export const baseUrl = "https://api.tapatradie.com/backend/v2/";
export const baseUrl = "http://3.109.98.222:3349/backend/v2/";

// For Settings/ Home and login

export const LoginFunction = async (data) => {
  try {
    const respose = await fetch(baseUrl + "loginExternal", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return await respose;
  } catch (e) {
    console.log(e);
  }
};

export const HomeAPi = async (token, search, page) => {
  try {
    let url = baseUrl + `users/?token=${token}`;
    if (search) {
      url += `&search=${search}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return await response;
  } catch (error) {
    console.log(error);
  }
};
export const updateSMS = async (data) => {
  try {
    const response = await fetch(baseUrl + `updateusersetting`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return await response;
  } catch (error) {
    console.log(error);
  }
};
export const updateNotification = async (data) => {
  try {
    const response = await fetch(baseUrl + `updateusersetting`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return await response;
  } catch (error) {
    console.log(error);
  }
};
