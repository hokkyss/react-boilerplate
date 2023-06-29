import styled from "@mui/system/styled";
import { padding } from "polished";

const Button = styled("button", { name: "Button", label: "Button" })(
  ({ theme }) => ({
    cursor: "pointer",
    ...theme.vars.typography.button,
    ...theme.vars.shape,
    ...padding(theme.spacing(1), theme.spacing(2)),
    backgroundColor: theme.vars.palette.primary.dark,
    borderColor: theme.vars.palette.primary.dark,
    color: theme.vars.palette.text.primary,
  })
);

export default Button;
