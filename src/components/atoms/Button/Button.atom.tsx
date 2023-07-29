import styled from "@mui/system/styled";
import { HTMLMotionProps, m } from "framer-motion";
import { padding, rgba } from "polished";

type ButtonVariant = "outlined" | "solid" | "text";

type ButtonProps = HTMLMotionProps<"button"> & { variant?: ButtonVariant };

const Button = styled(m.button, {
  name: "Button",
  label: "Button",
})<ButtonProps>(
  ({ theme }) => ({
    cursor: "pointer",
    ...theme.vars.typography.button,
    ...theme.vars.shape,
    ...padding(theme.spacing(1), theme.spacing(2)),
    color: theme.vars.palette.text.primary,
    transitionProperty: "all",
    transitionTimingFunction: theme.vars.transitions.easing.sharp,
    transitionDuration: `${theme.transitions.duration.standard}ms`,
  }),
  ({ theme, variant }) =>
    (!variant || variant === "text") && {
      border: 0,
      backgroundColor: "transparent",
      color: theme.vars.palette.primary.main,
      ":hover": {
        backgroundColor: rgba(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
      },
    },
  ({ theme, variant }) =>
    variant === "outlined" && {
      borderWidth: 1,
      borderColor: rgba(theme.palette.primary.main, 0.5),
      color: theme.vars.palette.primary.main,
      backgroundColor: "transparent",
      ":hover": {
        borderColor: theme.vars.palette.primary.main,
        backgroundcolor: rgba(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
      },
    },
  ({ theme, variant }) =>
    variant === "solid" && {
      border: 0,
      color: theme.vars.palette.primary.contrastText,
      backgroundColor: theme.vars.palette.primary.main,
      ":hover": {
        backgroundColor: theme.vars.palette.primary.dark,
      },
    }
);

export default Button;
