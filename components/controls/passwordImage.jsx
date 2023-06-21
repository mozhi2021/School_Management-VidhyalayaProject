import { Card, Paper, Typography } from "@mui/material";
import React from "react";
import NxtImage from "./nxtImage";
import Password2 from "../images/Password2.jpg";

export default function PasswordImage() {
  return (
    <Card sx={{ marginTop: "40px" }}>
      <NxtImage src={Password2} width="160" height="115" layout="responsive" />
    </Card>
  );
}
