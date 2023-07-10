import styled from "@mui/system/styled";
import { m } from "framer-motion";
import { padding } from "polished";

const Button = styled(m.button, { name: "Button", label: "Button" })(
  ({ theme }) => ({
    cursor: "pointer",
    ...theme.vars.typography.button,
    ...theme.vars.shape,
    ...padding(theme.spacing(1), theme.spacing(2)),
    backgroundColor: theme.vars.palette.primary.dark,
    borderColor: theme.vars.palette.primary.dark,
    color: theme.vars.palette.text.primary,
    transitionProperty: "all",
    transitionTimingFunction: theme.transitions.easing.sharp,
    transitionDuration: `${theme.transitions.duration.short}ms`,
  })
);

export default Button;
