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
import PasswordImage from "../components/controls/PasswordImage";
import validator from "validate";

const initialValues = {
  OldPassword: "",
  NewPassword: "",
  ConfirmPassword: "",
};

export default function ChangePassword() {
  const [loggingIn, setLoggingIn] = useState(false);

  const [NewPassword, setNewPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const isStrongPassword = "validator/lib/isStrongPassword.js";

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [submitDisable, setSubmitDisable] = useState(false);

  const validate = (fieldValues = formValues) => {
    let temp = { ...errors };

    // let isStrongPassword = function () {
    //   console.log("anything");
    // };
    // isStrongPassword;

    if ("OldPassword" in fieldValues)
      temp.OldPassword = fieldValues.OldPassword ? "" : "Required.";

    if ("NewPassword" in fieldValues) {
      temp.NewPassword = fieldValues.NewPassword ? "" : "Required.";
      //    if (fieldValues.NewPassword != "")
      // temp.NewPassword =

      //   if (
      //     validator.isStrongPassword(NewPassword, {
      //       minLength: 8,
      //       minUppercase: 1,
      //       minNumbers: 1,
      //       minSymbols: 1,
      //     })
      //   ) {
      //     setErrorMessage("Is Strong Password");
      //   } else {
      //     setErrorMessage("Is Not Strong Password");
      //   }
      // }
      if (fieldValues.NewPassword != "")
        temp.NewPassword =
          /^(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$/.test(
            fieldValues.NewPassword
          )
            ? ""
            : "NewPassword is not valid. " +
              "\nPassword should contain atleast one uppercase letter!" +
              "\nPassword should contain atleast one number!" +
              "\nPassword should contain atleast one special character!";
    }

    if ("ConfirmPassword" in fieldValues) {
      temp.ConfirmPassword = fieldValues.ConfirmPassword ? "" : "Required.";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitDisable(true);
    if (validate()) {
      //call the change password api
    } else {
      setSubmitDisable(false);
    }
  };

  return (
    <>
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
                    Change Password
                  </Typography>
                  <>
                    <Grid container>
                      <UserControls.Password
                        name="OldPassword"
                        label="Old Password"
                        required={true}
                        value={formValues.OldPassword}
                        onChange={handleInputChange}
                        error={errors.OldPassword}
                      />

                      <UserControls.Password
                        name="NewPassword"
                        label="New Password"
                        required={true}
                        value={formValues.NewPassword}
                        onChange={handleInputChange}
                        error={errors.NewPassword}
                        minlength="8"
                      />
                      <UserControls.Password
                        name="ConfirmPassword"
                        label="Confirm Password"
                        required={true}
                        value={formValues.ConfirmPassword}
                        onChange={handleInputChange}
                        error={errors.ConfirmPassword}
                        minlength="8"
                      />
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
                        text="Submit"
                        disabled={submitDisable}
                      />
                    </Grid>
                    <br />

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
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <PasswordImage />
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
