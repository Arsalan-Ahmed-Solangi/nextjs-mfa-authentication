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
      }}
    />
  );
};

export default FormInput;
