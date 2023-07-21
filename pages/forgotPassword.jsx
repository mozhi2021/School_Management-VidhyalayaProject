import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Grid, Paper, Container, CircularProgress } from "@mui/material";
import { useForm, Form } from "../components/useForm";
import Controls from "../components/controls";
import ForgotpasswordImage from "../components/controls/forgotPasswordImage";
import axios from "axios";
import * as global from "../components/Global/global";
import UserControls from "../components/userControls";
import MuiNextLink from "../components/layout/header/MuiNextLink";

const initialValues = {
  UserName: "",
  EmailAddress: "",
};

export default function ForgotPassword(props) {
  const [submitIn, setSubmitIn] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const validate = (fieldValues = formValues) => {
    let temp = { ...errors };

    if ("UserName" in fieldValues)
      temp.UserName = fieldValues.UserName ? "" : "Required.";

    if ("EmailAddress" in fieldValues) {
      temp.EmailAddress = fieldValues.EmailAddress ? "" : "Required";
      if (fieldValues.EmailAddress != "")
        temp.EmailAddress = /$^|.+@.+..+/.test(fieldValues.EmailAddress)
          ? ""
          : "EmailAddress is not valid";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues == formValues)
      return Object.values(temp).every((x) => x == "");
  };

  const { formValues, errors, setErrors, handleInputChange } = useForm(
    initialValues,
    true,
    validate
  );

  const ForgotPassword = () => {
    setSubmitIn(true);
    // alert(global.API_URL);
    axios
      .post(
        global.API_URL +
          "Login/UpdatePassword?UserName=" +
          formValues.UserName.trim() +
          "&EmailAddress=" +
          formValues.EmailAddress.trim()
      )
      .then((res) => {
        const data = res.data;

        if (data != "Password Updated") {
          setNotify({
            isOpen: true,
            code: "Invalid User - ForgotPassword",
            title: "",
            message: data,
            type: "error",
          });
        } else {
          setPasswordUpdated(true);
        }
        setSubmitIn(false);
        setSubmitDisable(false);
      })
      .catch((error) => {
        setSubmitIn(false);
        setSubmitDisable(false);
        setNotify({
          isOpen: true,
          code: error.response?.data.code,
          title: error.response?.data.title,
          message: error.response?.data.message,
          type: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmitDisable(true);

      ForgotPassword();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* <Grid container className="formContainer"> */}
        <Grid item xs={12} md={6}>
          <Container maxWidth="lg">
            <Box sx={{ pt: 1 }}>
              {!passwordUpdated && (
                <Paper
                  sx={{ backgroundColor: "#F5F5F5" }}
                  className="formpageContent"
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="formContentTitle"
                  >
                    Forgot Password
                  </Typography>
                  <>
                    <Grid container>
                      <Controls.Input
                        name="UserName"
                        label="UserName"
                        required={true}
                        value={formValues.UserName}
                        onChange={handleInputChange}
                        error={errors.UserName}
                      />

                      <Controls.Input
                        label="EmailAddress"
                        name="EmailAddress"
                        required={true}
                        value={formValues.EmailAddress}
                        onChange={handleInputChange}
                        error={errors.EmailAddress}
                      />
                    </Grid>
                    <br />
                    <Grid container sx={{ px: "10%", justifyContent: "right" }}>
                      {submitIn && (
                        <Box sx={{ ml: 2, mr: 2 }}>
                          <CircularProgress color="primary" />
                        </Box>
                      )}
                      <Controls.Button
                        type="Submit"
                        text="Submit"
                        disabled={submitDisable}
                      />
                    </Grid>
                    <Grid container sx={{ justifyContent: "center" }}>
                      {notify.isOpen && (
                        <UserControls.Notification
                          notify={notify}
                          setNotify={setNotify}
                        />
                      )}
                    </Grid>
                  </>
                </Paper>
              )}
              {passwordUpdated && (
                <Grid container sx={{ justifyContent: "center" }}>
                  Password is updated and Send to your email address.
                  <Grid container sx={{ px: "10%", justifyContent: "right" }}>
                    <MuiNextLink
                      key="Home"
                      href="/"
                      variant="button"
                      styleClass="home"
                    >
                      Click here to Login
                    </MuiNextLink>
                  </Grid>
                  <br />
                </Grid>
              )}
            </Box>
          </Container>
        </Grid>

        <Grid item xs={12} md={6}>
          <ForgotpasswordImage />
        </Grid>
        {/* </Grid> */}
      </Form>
    </>
  );
}
