import React from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import {
  FormHelperText,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";

export default function Password(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    name,
    label,
    value,
    onChange,
    error = null,
    required,
    disabled,
    readOnly,
    maxlength,
  } = props;

  return (
    <>
      <FormControl {...(error && { error: true })} size="small">
        <InputLabel>{required ? label + " *" : label}</InputLabel>

        <OutlinedInput
          disabled={disabled || false}
          value={value}
          onChange={onChange}
          name={name}
          label={required ? label + " *" : label}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            maxLength: maxlength,
            readOnly: Boolean(readOnly || false),
          }}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </>
  );
}
