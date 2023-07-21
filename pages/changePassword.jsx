import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, Paper, Container, CircularProgress } from "@mui/material";
import { useForm, Form } from "../components/useForm";
import Controls from "../components/controls";
import UserControls from "../components/userControls";
import PasswordImage from "../components/controls/PasswordImage";
import * as util from "../components/Global/util";
import axios from "axios";
import * as global from "../components/Global/global";

const initialValues = {
  OldPassword: "",
  NewPassword: "",
  ConfirmPassword: "",
};

export default function ChangePassword(props) {
  const [submitIn, setSubmitIn] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [submitDisable, setSubmitDisable] = useState(false);
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const validate = (fieldValues = formValues) => {
    let temp = { ...errors };

    if ("OldPassword" in fieldValues)
      temp.OldPassword = fieldValues.OldPassword ? "" : "Required.";

    if ("NewPassword" in fieldValues) {
      temp.NewPassword = fieldValues.NewPassword ? "" : "Required.";
      if (fieldValues.NewPassword != "") {
        temp.NewPassword = strongRegex.test(fieldValues.NewPassword)
          ? ""
          : "Password should be atleast one uppercase letter.  Password should be atleast one lowercase letter.  Password should be atleast one number.  Password should be atleast one special character.  Password should be minimum 8 characters ";
      }
    }

    if ("ConfirmPassword" in fieldValues) {
      temp.ConfirmPassword = fieldValues.ConfirmPassword ? "" : "Required.";
      if (fieldValues.ConfirmPassword != "") {
        temp.ConfirmPassword =
          formValues.NewPassword == fieldValues.ConfirmPassword //have to use formvalues not fieldvalues
            ? ""
            : "NewPassword and Confirm password does not match.";
      }
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

  const ChangePassword = () => {
    setSubmitIn(true);

    axios
      .post(
        global.API_URL +
          "Login/ChangePassword?OldPassword=" +
          formValues.OldPassword.trim()
        // +
        // "&PersonID=" +
        // formValues.PersonID.trim()
      )
      .then((res) => {
        const data = res.data;

        if (data != "Password Updated") {
          setNotify({
            isOpen: true,
            code: "OldPassword incorrect - ChangePassword",
            title: "",
            message: data,
            type: "error",
          });
        } else {
          // setPasswordUpdated(true);
          util.GetUserData(data);
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

      const user = util.GetUserData();
      alert(user.PersonID);
      //ChangePassword();
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
                        maxlength="15"
                      />
                      <UserControls.Password
                        name="ConfirmPassword"
                        label="Confirm Password"
                        required={true}
                        value={formValues.ConfirmPassword}
                        onChange={handleInputChange}
                        error={errors.ConfirmPassword}
                        minlength="8"
                        maxlength="15"
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
