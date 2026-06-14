import TextField from "@mui/material/TextField";

const FormTextInput = ({ name, value = "", onChange = null, ...props }) => {
  return (
    <TextField
      size="small"
      fullWidth
      name={name}
      value={value}
      onChange={onChange || (() => {})}
      {...props}
    />
  );
};

export default FormTextInput;
