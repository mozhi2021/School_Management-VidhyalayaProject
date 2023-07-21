import axios from "axios";

// export function GetIPAddress() {
//   axios
//     .get("https://geolocation-db.com/json/")
//     .then((response) => {
//       return response.data.IPv4;
//     })
//     .catch((error) => {
//       alert(error);
//     });

//   return "127.0.0.1";
// }

export function InsertUserData(data) {
  sessionStorage.setItem("UserData", JSON.stringify(data));
  //sessionStorage.setItem("IpAddress", "127.0.0.1");
}

export function GetUserData() {
  if (sessionStorage.getItem("UserData" == null)) {
    sessionStorage.setItem("UserData", JSON.stringify([]));
  }
  return JSON.parse(sessionStorage.getItem("UserData"));
}

export function UpdateUserData() {
  sessionStorage.setItem("UserData", JSON.stringify(data));
  
}
