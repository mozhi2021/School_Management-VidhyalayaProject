import axios from "axios";

export function GetCounrtyName() {
  return "India";
}

export function GetIPAddress() {
  axios
    .get("https://geolocation-db.com/json/")
    .then((response) => {
      return response.data.IPv4;
    })
    .catch((error) => {
      alert(error);
    });

  return "127.0.0.1";
}

export function InsertUserData(data) {
  sessionStorage.setItem("UserData", JSON.stringify(data));

  sessionStorage.getItem("UserData", JSON.stringify(data));
}
