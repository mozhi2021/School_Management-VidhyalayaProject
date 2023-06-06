import { TextField } from "@mui/material";
import React from "react";

export default function input(props) {
  const {
    name,
    label,
    value,
    error = null,
    required,
    disabled,
    readOnly,
    onChange,
    maxlength,
    ...other
  } = props;

  return (
    <>
      <TextField
        disabled={disabled || false}
        size="small"
        label={required ? label + " *" : label}
        name={name}
        value={value}
        onChange={onChange}
        {...(error && { error: true, helperText: error })}
        inputProps={{
          maxLength: maxlength,
          readOnly: Boolean(readOnly || false),
        }}
        {...other}
      />
    </>
  );
}
