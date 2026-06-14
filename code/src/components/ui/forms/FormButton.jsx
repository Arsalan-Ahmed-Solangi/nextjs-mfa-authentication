import Button from "@mui/material/Button";

const FormButton = ({ children, onClick, ...props }) => {
  return (
    <Button variant="contained" size="small" onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default FormButton;
