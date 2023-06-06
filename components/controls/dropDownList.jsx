import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function dropdownlist(props) {
  const {
    name,
    label,
    value,
    options,
    error = null,
    required,
    disabled,
    readOnly,
    onChange,
  } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl
      variant="outlined"
      size="small"
      disabled={disabled || false}
      {...(error && { error: true })}
    >
      <InputLabel>{required ? label + " *" : label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        inputProps={{
          readOnly: Boolean(readOnly || false),
        }}
      >
        <MenuItem value=""></MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
