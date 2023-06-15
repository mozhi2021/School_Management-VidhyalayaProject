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
      return response.data.IPv4;
    })
    .catch((error) => {
      alert(error);
    });

  return "127.0.0.1";
}

export function StoringData(data) {
  //store to session storeage
  const saveData = () => {
    //saving username to session storage
    sessionStorage.setItem("Username", Username);
    sessionStorage.setItem("Password", Password);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  // const getSessionData = () => {
  //   //fetching username from sesstion storage
  //   return sessionStorage.getItem("name");
  // };
}
