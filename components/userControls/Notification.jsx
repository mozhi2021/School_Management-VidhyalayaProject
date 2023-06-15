import { Alert, Snackbar, AlertTitle, Typography } from "@mui/material";
import React from "react";

export default function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      //return
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Alert severity={notify.type} variant="outlined">
      <AlertTitle>Error Code : {notify.code} </AlertTitle>
      {notify.title} : {notify.message}
    </Alert>
  );
}
