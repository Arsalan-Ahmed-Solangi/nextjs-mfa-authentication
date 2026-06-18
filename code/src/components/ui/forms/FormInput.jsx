import TextField from "@mui/material/TextField";

const FormInput = ({ name, value = "", onChange = null, ...props }) => {
  return (
    <TextField
      size="small"
      fullWidth
      name={name}
      value={value}
      onChange={onChange || (() => {})}
      {...props}
      sx={{
        "& .MuiInputBase-input::placeholder": {
          fontSize: "14px",
        },
         "& input[type=number]": {
      MozAppearance: "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
      }}
    />
  );
};

export default FormInput;
