import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, Paper, Container, CircularProgress } from "@mui/material";
import { useForm, Form } from "../components/useForm";
import Controls from "../components/controls";
import UserControls from "../components/userControls";
import { useRouter as UseRouter } from "next/router";
import MuiNextLink from "../components/layout/header/MuiNextLink";
import Head from "next/head";
import SchoolImage from "../components/controls/schoolImage";
import * as util from "../components/Global/util";
import axios from "axios";
import * as global from "../components/Global/global";
import { Global } from "@emotion/react";

const initialValues = {
  UserName: "",
  Password: "",
  IPAddress: "",
  Country: "",
};

export default function Index() {
  const [loggingIn, setLoggingIn] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [submitDisable, setSubmitDisable] = useState(false);

  const validate = (fieldValues = formValues) => {
    let temp = { ...errors };

    if ("UserName" in fieldValues)
      temp.UserName = fieldValues.UserName ? "" : "Required.";
    if ("Password" in fieldValues)
      temp.Password = fieldValues.Password ? "" : "Required.";

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

  //const Getuser()
  const Getuser = () => {
    setLoggingIn(true);
    window.alert(Global.API_URL);
    axios
      .post("https://localhost:7213/api/Login/ValidateUser", {
        UserName: formValues.UserName.trim(),
        Password: formValues.Password.trim(),
        IPAddress: formValues.IPAddress.trim(),
        Country: formValues.Country.trim(),
      })
      .then((res) => {
        const data = res.data.data;
        window.alert(JSON.stringify(data));
      })
      .catch((error) => {
        alert(error);
        setLoggingIn(false);
        setSubmitDisable(false);
        // setNotify({
        //   isOpen: true,
        //   code: err.response?.data.code,
        //   title: err.response?.data.title,
        //   message: err.response?.data.message,
        //   type: "error",
        // });
      });
  };

  // const Getuser = () => {
  //   window.alert(Global.API_URL);
  //   axios
  //     .post("https://localhost:7213/api/Login/ValidateUser", {
  //       UserName: formValues.UserName.trim(),
  //       Password: formValues.Password.trim(),
  //       IPAddress: formValues.IPAddress.trim(),
  //       Country: formValues.Country.trim(),
  //     })
  //     .then((res) => {
  //       const data = res.data.data;
  //       window.alert(JSON.stringify(data));
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // axios
      // .get("https://geolocation-db.com/json/")
      // .then((response) => {
      //   // alert(JSON.stringify(response.data));
      //   //alert(response.data.IPv4);
      //   formValues.IPAddress = response.data.IPv4;
      //   formValues.Country = response.data.country_name;
      window.alert(JSON.stringify(formValues));
      Getuser();
      // })
      // .catch((error) => {
      //   alert(error);
      // });
    }
  };

  return (
    <>
      <Head>
        <title>School | Login Form </title>
      </Head>
      {/* <Container> */}
      <Form onSubmit={handleSubmit}>
        <Grid container className="formContainer">
          <Grid item xs={12} md={6}>
            <Container maxWidth="lg">
              <Box sx={{ pt: 1 }}>
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
                    School Management
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
                        maxlength="30"
                      />
                      <UserControls.Password
                        name="Password"
                        label="Password"
                        required={true}
                        value={formValues.Password}
                        onChange={handleInputChange}
                        error={errors.Password}
                        maxlength="30"
                      />
                    </Grid>
                    <Grid container sx={{ px: "10%", justifyContent: "right" }}>
                      <MuiNextLink
                        key="Forgot Password"
                        href="path"
                        variant="button"
                        styleClass="Password"
                      >
                        Forgot Password?
                      </MuiNextLink>
                    </Grid>
                    <br />
                    <Grid container sx={{ px: "10%", justifyContent: "right" }}>
                      {loggingIn && (
                        <Box sx={{ ml: 2, mr: 2 }}>
                          <CircularProgress color="primary" />
                        </Box>
                      )}
                      <Controls.Button
                        type="Submit"
                        text="Login"
                        disabled={submitDisable}
                      />
                    </Grid>
                  </>
                </Paper>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <SchoolImage />
          </Grid>
        </Grid>
      </Form>
      {/* </Container> */}
    </>
  );
}
