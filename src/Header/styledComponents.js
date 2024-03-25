import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  width: "80%",
  maxWidth: "550px",
  marginLeft: 0,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up("sm")]: {
    width: "70%",
  },
}));

export const StyledSearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: theme.spacing(0, 2),
  color: "#bdc1c6",
  pointerEvents: "none",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  paddingRight: "10px",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));
