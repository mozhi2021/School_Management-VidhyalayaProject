import { Card, Paper, Typography } from "@mui/material";
import React from "react";
import NxtImage from "./nxtImage";
import ForgotpasswordImage1 from "../images/ForgotpasswordImage1.jpg";

export default function ForgotPasswordImage() {
  return (
    <Card sx={{ marginTop: "40px" }}>
      <NxtImage
        src={ForgotpasswordImage1}
        width="160"
        height="115"
        layout="responsive"
      />
    </Card>
  );
}
