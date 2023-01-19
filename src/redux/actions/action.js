import fakestoreapi from "../../Service/apis";
import { ActionTypes } from "../actions/actionTypes";
import axios from "axios";

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get("users/user");
    dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

export const authSignIn = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post("adminLogin", data);
    dispatch({ type: ActionTypes.AUTHRESPONSE, payload: response });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.AUTHRESPONSE, payload: "" });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
export const addUser = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post("users/addUser", data);
    dispatch({ type: ActionTypes.ADDUSER, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// For User and Tradie
export const SingleUserAction = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`users/details/${data}`);
      dispatch({ type: ActionTypes.SINGLEUSER, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

export const updateSingleUser = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.post(`users/editUser`, data);
      dispatch({ type: ActionTypes.UPDATESINGLEUSER, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
export const deleteUser = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`users/delete/${data}`);
      dispatch({ type: ActionTypes.DELETEUSER, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

export const changeUserStatus = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.post(`users/udateUserStatus`, data);
      dispatch({ type: ActionTypes.USERSTATUSRES, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// TradieApproval
export const tradieApproval = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.post(`users/approvedStatus`, data);
      dispatch({ type: ActionTypes.TRADIE_APPROVAL, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// user total hirings
export const userHireTradie = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`users/userHireTradie/${data}`);
      dispatch({ type: ActionTypes.USER_HIRING, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// All Countries Api
export const fetchCountries = () => async (dispatch) => {
  try {
    const response = await axios.get("https://api.first.org/data/v1/countries");
    dispatch({ type: ActionTypes.ALL_COUNTRIES, payload: response.data.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Tradie Api
export const fetchTradie = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`users/tradie?${data}`);
      dispatch({ type: ActionTypes.FETCH_TRADIE, payload: response.data.data });
      dispatch({ type: ActionTypes.TRADIE_LOADER, payload: true });
    } else {
      const response = await fakestoreapi.get("users/tradie");
      dispatch({ type: ActionTypes.FETCH_TRADIE, payload: response.data.data });
      dispatch({ type: ActionTypes.TRADIE_LOADER, payload: true });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

// Add Tradie
export const addTradie = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.post(`tradie/addTradie`, data);
      dispatch({ type: ActionTypes.ADD_TRADIE, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

// Edit Tradie
export const updateTradie = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`tradie/editTradie`, data);
    dispatch({ type: ActionTypes.EDIT_TRADIE, payload: response.data.message });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Edit Tradie
export const JobsByTradiess = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`tradie/Jobs/${data}`);
    dispatch({ type: ActionTypes.JOBS_BY_TRADIE, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// All Jobs
export const getAllJobs = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`tradie/jobs`);
    dispatch({ type: ActionTypes.ALL_JOBS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
//  Single Jobs
export const getSingleJobs = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`jobs/detail/${data}`);
      dispatch({ type: ActionTypes.SINGLE_JOBS, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
//Change Jobs Status and delete
export const changeJobsStatus = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`job_action/${data}`);
      dispatch({ type: ActionTypes.JOBS_STATUS, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Category List
export const categoryList = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`Services`);
    dispatch({ type: ActionTypes.CAT_LIST, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Category List
export const categoryAdd = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`services/add`, data);
    dispatch({ type: ActionTypes.CAT_ADD, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Single Category
export const getSingleCategory = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`services/details/${data}`);
    dispatch({ type: ActionTypes.SINGLE_CAT, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Edit Category
export const editService = (Id, data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.post(`services/edit/${Id}`, data);
      dispatch({ type: ActionTypes.EDIT_CAT, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Change Status Category
export const serviceStatus = (id, data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(
        `services/Servicesupdate/${data}/${id}`
      );
      dispatch({ type: ActionTypes.STATUS_CAT, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// delete Category
export const deleteService = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`services/delete/${data}`);
      dispatch({ type: ActionTypes.CAT_DEL, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Jobs by category
export const JobInService = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`services/jobs/${data}`);
      dispatch({ type: ActionTypes.CAT_JOB, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Tradies by category
export const TradieInService = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(
        `services/ServicesTradies/${data}`
      );
      dispatch({ type: ActionTypes.CAT_TRADIE, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

// Dashboard
export const dashboards = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`dashboard`);
    dispatch({ type: ActionTypes.DASHBOARD, payload: response.data.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Dashboard Graph
export const dashboardGraphs = (data) => async (dispatch) => {
  let currentYear = new Date().getFullYear();
  console.log("DATAINAPI", data);
  try {
    const response = await fakestoreapi.get(
      // `${data ? `getGraphData?${data}` : `getGraphData?month=&year=${currentYear-1}`}`
      `getGraphData?${data}`
    );
    dispatch({ type: ActionTypes.GRAPH_DASHBOARD, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Faq
export const faqAction = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`faq`);
    dispatch({ type: ActionTypes.FAQ, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Faq Add
export const faqAdd = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`faq/add`, data);
    dispatch({ type: ActionTypes.FAQ_ADD, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Faq Single data
export const faqSingle = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`faq/FaqDetails/${data}`);
    dispatch({ type: ActionTypes.FAQ_SINGLE, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Faq Single data
export const faqEdit = (id, data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`faq/edit/${id}`, data);
    dispatch({ type: ActionTypes.FAQ_EDIT, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Faq Delete
export const faqDelete = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`faq/delete/${data}`);
    dispatch({ type: ActionTypes.FAQ_DELETE, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Faq Category
export const faqCategory = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`faqcategory`);
    dispatch({ type: ActionTypes.FAQ_CAT, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// blog list
export const blogDataList = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`blog`);
    dispatch({ type: ActionTypes.BLOG, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// blog list
export const singleBlog = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`blog/BlogDetails/${data}`);
    dispatch({ type: ActionTypes.SINGLE_BLOG, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// blog Add
export const blogAdd = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`blog/add`, data);
    dispatch({ type: ActionTypes.BLOG_ADD, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// blog Edit
export const blogEdit = (id, data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`blog/edit/${id}`, data);
    dispatch({ type: ActionTypes.BLOG_EDIT, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// blog Del
export const blogDel = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`blog/delete/${data}`);
    dispatch({ type: ActionTypes.BLOG_DEL, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// NEWSLETTER
export const newsLetter = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`newsletter`);
    dispatch({ type: ActionTypes.NEWSLETTER, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// NEWSLETTER DEL
export const newsLetterDel = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`newsletter/delete/${data}`);
    dispatch({ type: ActionTypes.NEWSLETTER_DEL, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// TRADIE_TV
export const tradieTv = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`tradietv`);
    dispatch({ type: ActionTypes.TRADIE_TV, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// TRADIE_TV Single
export const tradieTvSingle = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`tradietv/tradietvDetails/${data}`);
    dispatch({ type: ActionTypes.SINGLE_TRADIE_TV, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// TRADIE_TV Add
export const TradieTvAdd = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`tradietv/make`, data);
    dispatch({ type: ActionTypes.ADD_TRADIE_TV, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// TRADIE_TV Edit
export const TradieTvEdit = (id, data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`tradietv/edit/${id}`, data);
    dispatch({ type: ActionTypes.EDIT_TRADIE_TV, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

// TRADIE_TV delete
export const TradieTvDelete = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`tradietv/delete/${data}`);
    dispatch({ type: ActionTypes.DELETE_TRADIE_TV, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// TRADIE_TV delete
export const TradieTvCategory = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`tradietvCategory`);
    dispatch({ type: ActionTypes.TRADIE_TV_CATEGORY, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// CONTACT_US
export const contactus = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`contactus`);
    dispatch({ type: ActionTypes.CONTACT_US, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// CONTACT_US DEL
export const contactusDel = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`contactus/delete/${data}`);
    dispatch({ type: ActionTypes.CONTACT_US_DEL, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
//Change Contactus Status
export const contactUsStatus = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(
        `contactus/updateContactStatus/${data}`
      );
      dispatch({ type: ActionTypes.CONTACT_US_STATUS, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Rating List
export const ratingReview = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`ratingList`);
    dispatch({ type: ActionTypes.RATING, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Rating Delete
export const ratingDelete = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`rating/delete/${data}`);
    dispatch({ type: ActionTypes.RATING_DELETE, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

// TNC List
export const tncList = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`pages/termsandconditions`);
    dispatch({ type: ActionTypes.TNC_LIST, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Privacy Policy List
export const privacyList = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`pages/privacypolicy`);
    dispatch({ type: ActionTypes.PRIVACY_POLICY, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// About Us List
export const aboutUsList = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`pages/aboutus`);
    dispatch({ type: ActionTypes.ABOUT_US, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// pages update
export const pagesUpdate = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`pages/pageupdate`, data);
    dispatch({ type: ActionTypes.ABOUT_US_UPDATE, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Lead List
export const LeadList = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`Getleads`);
    dispatch({ type: ActionTypes.LEADS, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// Banner List
export const BannerList = () => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`banner`);
    dispatch({ type: ActionTypes.BANNER, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

export const SingleBanner = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`banner`);
      dispatch({ type: ActionTypes.SINGLE_BANNER, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

export const EditBanner = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.post(`banner/add`, data);
      dispatch({ type: ActionTypes.UPDATE_BANNER, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};

export const SUPPORTlist = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`supportList?${data}`);
      dispatch({ type: ActionTypes.SUPPORT_LIST, payload: response.data.data });
      dispatch({ type: ActionTypes.LOADER, payload: true });
    } else {
      const response = await fakestoreapi.get(`supportList?`);
      dispatch({ type: ActionTypes.SUPPORT_LIST, payload: response.data.data });
      dispatch({ type: ActionTypes.LOADER, payload: true });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
export const Subscriptionlist = (data) => async (dispatch) => {
  try {
    if (data) {
      const response = await fakestoreapi.get(`subscription?${data}`);
      dispatch({
        type: ActionTypes.SUBSCRIPTION_LIST,
        payload: response.data.data,
      });
      dispatch({ type: ActionTypes.SUBS_LOADER, payload: true });
    } else {
      const response = await fakestoreapi.get(`subscription?`);
      dispatch({
        type: ActionTypes.SUBSCRIPTION_LIST,
        payload: response.data.data,
      });
      dispatch({ type: ActionTypes.SUBS_LOADER, payload: true });
    }
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// TOTAL_PAYMENT
export const totalPayment = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`subscription_data?${data}`);
    dispatch({ type: ActionTypes.TOTAL_PAYMENT, payload: response.data.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// TRADIE_SUBSCRIPTION
export const tradieSubscription = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.get(`user_wise_subscription?${data}`);
    dispatch({
      type: ActionTypes.TRADIE_SUBSCRIPTION,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
// CHANGE_PASSWORD
export const changePassword = (data) => async (dispatch) => {
  try {
    const response = await fakestoreapi.post(`changepassword`, data);
    dispatch({ type: ActionTypes.CHANGE_PASSWORD, payload: response.data });
  } catch (err) {
    dispatch({ type: ActionTypes.ERRORS, payload: err });
  }
};
