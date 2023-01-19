import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  user: [],
  error: "",
  auth: [],
  response: "",
  addUsers: "",
  userHiring: [],
  singleUser: [],
  editUser: false,
  updateUserRes: "",
  updateBannerRes: "",
  deleteUserRes: null,
  userStatus: "",
  tradieList: [],
  addTradieRes: "",
  approvalTradieRes: null,
  editTradieRes: "",
  jobsByTradieList: [],
  allCountries: [],
  allJobs: [],
  singleJobs: [],
  job_status: "",
  categoriesList: [],
  SingleCat: [],
  categoriesAdd: "",
  categorieseDel: "",
  serviceStatusRes: "",
  jobsByService: [],
  tradiesByService: [],
  dashboardData: [],
  dashboardGraphData: [],
  faqData: [],
  faqS: [],
  faqRes: "",
  faqDelRes: "",
  faqCat: [],
  blogList: [],
  Support_List: [],
  singleBlogD: [],
  blogAddRes: "",
  blogDelRes: "",
  newsletter: [],
  newsletterRes: "",
  TradieTvData: [],
  TradieTvSin: [],
  TradieTvRes: "",
  TradieTvDelRes: "",
  TradieTvCat: "",
  contactUsList: [],
  contactUsDel: "",
  contactUsSts: "",
  ratingList: [],
  ratingDelRes: "",
  TNCListD: [],
  PolicyList: [],
  aboutusList: [],
  aboutusRes: "",
  leadData: [],
  bannerData: [],
  singleBanner: [],
  passwordChange: "",
  Subscription_List: [],
  loading: false,
  sub_loading: false,
  tradie_loader: false,
  total_payment_data: [],
  tradie_subscription_data: [],
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_USER:
      return { ...state, user: payload };
    case ActionTypes.ERRORS:
      return { ...state, error: payload };
    default:
      return state;
  }
};
export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.AUTH:
      return { ...state, auth: payload };
    case ActionTypes.AUTHRESPONSE:
      return { ...state, response: payload };
    default:
      return state;
  }
};
// Add New User
export const addUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADDUSER:
      return { ...state, addUsers: payload };
    default:
      return state;
  }
};
// User hirings
export const userHiringsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_HIRING:
      return { ...state, userHiring: payload };
    default:
      return state;
  }
};
// for all countries
export const countriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ALL_COUNTRIES:
      return { ...state, allCountries: payload };
    default:
      return state;
  }
};
// Edit single User
export const editUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SINGLEUSER:
      return { ...state, singleUser: payload };

    case ActionTypes.UPDATESINGLEUSER:
      return { ...state, updateUserRes: payload };

    default:
      return state;
  }
};
// Delete single User
export const deleteUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DELETEUSER:
      return { ...state, deleteUserRes: payload };

    case ActionTypes.USERSTATUSRES:
      return { ...state, userStatus: payload };

    default:
      return state;
  }
};

// Add New Tradie
export const TradieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_TRADIE:
      return { ...state, tradieList: payload };
    case ActionTypes.ADD_TRADIE:
      return { ...state, addTradieRes: payload };
    case ActionTypes.EDIT_TRADIE:
      return { ...state, editTradieRes: payload };
    case ActionTypes.JOBS_BY_TRADIE:
      return { ...state, jobsByTradieList: payload };
    case ActionTypes.TRADIE_APPROVAL:
      return { ...state, approvalTradieRes: payload };
    default:
      return state;
  }
};
// edit Tradie
export const editTradieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.EDIT_TRADIE:
      return { ...state, editTradieRes: payload };
    default:
      return state;
  }
};
// All Jobs
export const allJobsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ALL_JOBS:
      return { ...state, allJobs: payload };
    default:
      return state;
  }
};
//  single Jobs
export const singleJobsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SINGLE_JOBS:
      return { ...state, singleJobs: payload };
    default:
      return state;
  }
};
// Jobs Status
export const jobStatusReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.JOBS_STATUS:
      return { ...state, job_status: payload };
    default:
      return state;
  }
};
// Category Reducer
export const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CAT_LIST:
      return { ...state, categoriesList: payload };
    case ActionTypes.CAT_ADD:
      return { ...state, categoriesAdd: payload };
    case ActionTypes.SINGLE_CAT:
      return { ...state, SingleCat: payload };
    case ActionTypes.EDIT_CAT:
      return { ...state, categoriesAdd: payload };
    case ActionTypes.STATUS_CAT:
      return { ...state, serviceStatusRes: payload };
    case ActionTypes.CAT_DEL:
      return { ...state, categorieseDel: payload };
    case ActionTypes.CAT_JOB:
      return { ...state, jobsByService: payload };
    case ActionTypes.CAT_TRADIE:
      return { ...state, tradiesByService: payload };
    default:
      return state;
  }
};
// Dashboard Reducer
export const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DASHBOARD:
      return { ...state, dashboardData: payload };
    case ActionTypes.GRAPH_DASHBOARD:
      return { ...state, dashboardGraphData: payload };

    default:
      return state;
  }
};
// FAQ Reducer
export const faqReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FAQ:
      return { ...state, faqData: payload };
    case ActionTypes.FAQ_ADD:
      return { ...state, faqRes: payload };
    case ActionTypes.FAQ_EDIT:
      return { ...state, faqRes: payload };
    case ActionTypes.FAQ_SINGLE:
      return { ...state, faqS: payload };
    case ActionTypes.FAQ_DELETE:
      return { ...state, faqDelRes: payload };
    case ActionTypes.FAQ_CAT:
      return { ...state, faqCat: payload };

    default:
      return state;
  }
};
// blog Reducer
export const blogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.BLOG:
      return { ...state, blogList: payload };
    case ActionTypes.SINGLE_BLOG:
      return { ...state, singleBlogD: payload };
    case ActionTypes.BLOG_ADD:
      return { ...state, blogAddRes: payload };
    case ActionTypes.BLOG_EDIT:
      return { ...state, blogAddRes: payload };
    case ActionTypes.BLOG_DEL:
      return { ...state, blogDelRes: payload };

    default:
      return state;
  }
};
// Newsletter Reducer
export const newsletterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.NEWSLETTER:
      return { ...state, newsletter: payload };
    case ActionTypes.NEWSLETTER_DEL:
      return { ...state, newsletterRes: payload };

    default:
      return state;
  }
};
// tradietv Reducer
export const tradieTvReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.TRADIE_TV:
      return { ...state, TradieTvData: payload };
    case ActionTypes.SINGLE_TRADIE_TV:
      return { ...state, TradieTvSin: payload };
    case ActionTypes.ADD_TRADIE_TV:
      return { ...state, TradieTvRes: payload };
    case ActionTypes.EDIT_TRADIE_TV:
      return { ...state, TradieTvRes: payload };
    case ActionTypes.DELETE_TRADIE_TV:
      return { ...state, TradieTvDelRes: payload };
    case ActionTypes.TRADIE_TV_CATEGORY:
      return { ...state, TradieTvCat: payload };
    default:
      return state;
  }
};
// contactus Reducer
export const contactusReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CONTACT_US:
      return { ...state, contactUsList: payload };
    case ActionTypes.CONTACT_US_DEL:
      return { ...state, contactUsDel: payload };
    case ActionTypes.CONTACT_US_STATUS:
      return { ...state, contactUsSts: payload };

    default:
      return state;
  }
};
// Support Reducer
export const supportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SUPPORT_LIST:
      return { ...state, Support_List: payload };

    default:
      return state;
  }
};
// SUBSCRIPTION Reducer
export const subscriptionReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SUBSCRIPTION_LIST:
      return { ...state, Subscription_List: payload };
    case ActionTypes.TOTAL_PAYMENT:
      return { ...state, total_payment_data: payload };
    case ActionTypes.TRADIE_SUBSCRIPTION:
      return { ...state, tradie_subscription_data: payload };

    default:
      return state;
  }
};
// Loader Reducer
export const loaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOADER:
      return { ...state, loading: payload };
    case ActionTypes.SUBS_LOADER:
      return { ...state, sub_loading: payload };
    case ActionTypes.TRADIE_LOADER:
      return { ...state, tradie_loader: payload };

    default:
      return state;
  }
};
// Rating Reducer
export const ratingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.RATING:
      return { ...state, ratingList: payload };
    case ActionTypes.RATING_DELETE:
      return { ...state, ratingDelRes: payload };

    default:
      return state;
  }
};
//termsandconditions Reducer
export const tncReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.TNC_LIST:
      return { ...state, TNCListD: payload };

    default:
      return state;
  }
};
//policy Reducer
export const policyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.PRIVACY_POLICY:
      return { ...state, PolicyList: payload };

    default:
      return state;
  }
};
//About us Reducer
export const aboutUsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ABOUT_US:
      return { ...state, aboutusList: payload };
    case ActionTypes.ABOUT_US_UPDATE:
      return { ...state, aboutusRes: payload };

    default:
      return state;
  }
};
//Lead Reducer
export const leadReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LEADS:
      return { ...state, leadData: payload };

    default:
      return state;
  }
};
//BANNER Reducer
export const bannerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.BANNER:
      return { ...state, bannerData: payload };
    case ActionTypes.SINGLE_BANNER:
      return { ...state, singleBanner: payload };
    case ActionTypes.UPDATE_BANNER:
      return { ...state, updateBannerRes: payload };

    default:
      return state;
  }
};

//Settings Reducer
export const settingsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CHANGE_PASSWORD:
      return { ...state, passwordChange: payload };

    default:
      return state;
  }
};

// export const selectedProductReducer = (state = {}, { type, payload }) => {
//   switch (type) {
//     case ActionTypes.SELECTED_PRODUCT:
//       return { ...state, ...payload };
//     case ActionTypes.REMOVE_SELECTED_PRODUCT:
//       return {};
//     default:
//       return state;
//   }
// };
