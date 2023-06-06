import axios from "axios";

export function GetCounrtyName() {
  return "India";
}
export function GetIPAddress() {
  //creating function to load ip address from the API
  //const getData = async () => {
  axios
    .get("https://geolocation-db.com/json/")
    .then((response) => {
      // alert(JSON.stringify(response.data));
      //alert(response.data.IPv4);
      return response.data.IPv4;
    })
    .catch((error) => {
      alert(error);
    });
    

  return "127.0.0.1";
}
