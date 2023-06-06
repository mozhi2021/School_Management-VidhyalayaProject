import React from "react";
import { Button as MuiButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const UseStyles = makeStyles({
  root: {
    // backgroundColor: "#154c79",
    backgroundColor: "#1e4e76",
    margin: theme.spacing(1, "auto"),
    color: "#ffffff",
  },
});

export default function button(props) {
  const { text, size, variant, onClick, disabled, ...other } = props;

  const Styles = UseStyles();

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      disabled={disabled || false}
      onClick={onClick}
      sx={{ backgroundColor: "#1e4e76", color: "common.white" }}
      // className={Styles.root}
      {...other}
    >
      {text}
    </MuiButton>
  );
}
