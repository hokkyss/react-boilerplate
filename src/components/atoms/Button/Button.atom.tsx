import styled from "@mui/system/styled";
import { padding } from "polished";

const Button = styled("button", { name: "Button", label: "Button" })(
  ({ theme }) => ({
    cursor: "pointer",
    ...theme.typography.button,
    ...theme.shape,
    ...padding(theme.spacing(1), theme.spacing(2)),
    backgroundColor: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
    color: theme.palette.text.primary,
  })
);

export default Button;
