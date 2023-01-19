// import React, { useState, useEffect } from "react";
// import { FacebookProvider, Login, Page } from "react-facebook";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// export default function FbRating() {
//   const [show, setShow] = useState(false);
//   const [data, setData] = useState([]);
//   // handleResponse = (data) => {
//   //   setData(data.profile),

//   //   console.log(data);
//   // };

 
//   useEffect(() => {
//     window.fbAsyncInit = function () {
//       // FB JavaScript SDK configuration and setup

//       window.FB.init({
//         appId: "800163450918050",
//         cookie: true,
//         xfbml: true,
//         version: "v8.0",
//       });

//       // Check whether the user already logged in
//       window.FB.getLoginStatus(function (response) {
//         if (response.status === "connected") {
//           //display user data
//           getFbUserData();
//         }
//       });
//     };

//     // load facebook sdk script
//     (function (d, s, id) {
//       var js,
//         fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) {
//         return;
//       }
//       js = d.createElement(s);
//       js.id = id;
//       js.src = "https://connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     })(document, "script", "facebook-jssdk");
//   }, []);

//   // Facebook login with JavaScript SDK
//   function fbLogin() {
//     setShow(false);
//     FB.login(
//       function (response) {
//         console.log(response);
//         if (response.authResponse) {
//           //
//           FB.api(
//             "" + response.authResponse.userID + "/accounts",
//             "GET",
//             { access_token: response.authResponse.accessToken },
//             function (Response2) {
//               console.log("Response2", Response2);
//               fetch(
//                 "https://graph.facebook.com/" +
//                   Response2.data[0].id +
//                   "?fields=access_token,overall_star_rating&access_token=" +
//                   response.authResponse.accessToken,
//                 {
//                   headers: {
//                     authorization: "Authorization",
//                     Bearer: `Bearer ${Response2.data.access_token}`,
//                   },
//                 }
//               )
//                 .then((res) => res.json())
//                 .then((val) => console.log(" val :", val));
//             }
//           );

//           // Get and display the user profile data
//           getFbUserData();
//         } else {
//           document.getElementById("status").innerHTML =
//             "User cancelled login or did not fully authorize.";
//         }
//       },
//       { scope: "pages_show_list,read_insights,pages_read_user_content" }
//     );
//   }

//   // Fetch the user profile data from facebook
//   function getFbUserData() {
//     setShow(true);
//     FB.api(
//       "/me",
//       {
//         locale: "en_US",
//         fields: "id,first_name,last_name,email,link,gender,locale,picture",
//       },
//       function (response) {
//         setData(response);
//         // document.getElementById("fbLink").setAttribute("onClick", "fbLogout");
//         // document.getElementById("fbLink").innerHTML = "Logout from Facebook";
//         // document.getElementById("status").innerHTML =
//         //   "<p>Thanks for logging in, " + response &&
//         //   response.first_name + "!</p>";
//         // document.getElementById("userData").innerHTML =
//         //   '<h2>Facebook Profile Details</h2><p><img src="' + response &&
//         //   response.picture.data.url + '"/></p><p><b>FB ID:</b> ' + response &&
//         //   response.id + "</p><p><b>Name:</b> " + response &&
//         //   response.first_name + " " + response &&
//         //   response.last_name + "</p><p><b>Email:</b> " + response &&
//         //   response.email + "</p><p><b>Gender:</b> " + response &&
//         //   response.gender +
//         //     '</p><p><b>FB Profile:</b> <a target="_blank" href="' +
//         //     response &&
//         //   response.link + '">click to view profile</a></p>';
//       }
//     );
//   }

//   // Logout from facebook
//   function fbLogout() {
//     setShow(false);
//     FB.logout(function () {
//       document.getElementById("fbLink").setAttribute("onclick", "fbLogin()");
//       document.getElementById("fbLink").innerHTML =
//         '<img src="images/fb-login-btn.png"/>';
//       document.getElementById("userData").innerHTML = "";
//       document.getElementById("status").innerHTML =
//         "<p>You have successfully logout from Facebook.</p>";
//     });
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       {/* <FacebookProvider appId="800163450918050">
//         <Login
//           scope="email"
//           onCompleted={this.handleResponse}
//           onError={this.handleError}
//         >
//           {({ loading, handleClick, error, data }) => (
//             <>
//               <br />
//               {loading ? (
//                 <span>Loading...</span>
//               ) : (
//                 <button onClick={handleClick}>Login via Facebook</button>
//               )}
//             </>
//           )}
//         </Login>
//         <Page href="https://www.facebook.com" tabs="timeline" />
//       </FacebookProvider> */}

//       {/* The JS SDK Login Button  */}

//       {/* Display login status  */}
//       <div id="status"></div>

//       {/* Facebook login or logout button  */}
//       <a onClick={fbLogin} id="fbLink">
//         login
//       </a>

//       {/* Display user's profile info  */}
//       <div class="ac-data" id="userData"></div>
//       {show && (
//         <div>
//           <button onClick={fbLogout}> Logout</button>
//           <p>Thanks for logging in, {data && data.first_name} !</p>
//           <h2>Facebook Profile Details</h2>
//           <p>
//             <img src={data && data.picture?.data?.url} />
//           </p>
//           <p>
//             <b>FB ID:</b> {data && data.id}
//           </p>
//           <p>
//             <b>Name:</b>{" "}
//             {data && data.first_name + "  " + data && data.last_name}
//           </p>
//           <p>
//             <b>Email:</b>
//             {data && data.email}
//           </p>
//           <p>
//             <b>Gender:</b>
//             {data && data.gender}
//           </p>
//           <p>
//             <b>FB Profile:</b>
//             <a target="_blank" href={data && data.link}>
//               click to view profile
//             </a>
//           </p>
         
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }
