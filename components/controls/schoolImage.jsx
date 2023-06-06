import { Card, Paper, Typography } from "@mui/material";
import React from "react";
import NxtImage from "./nxtImage";
import schoolImage2 from "../images/schoolImage2.jpg";

export default function SchoolImage() {
  return (
    <Card sx={{ marginTop: "40px" }}>
      <NxtImage
        src={schoolImage2}
        width="160"
        height="115"
        layout="responsive"
      />
    </Card>
  );
}
