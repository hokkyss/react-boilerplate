import styled from "@mui/system/styled";
import type { HTMLMotionProps } from "framer-motion";
import { m } from "framer-motion";
import { padding, rgba } from "polished";

type ButtonVariant = "outlined" | "solid" | "text";

type ButtonProps = HTMLMotionProps<"button"> & { variant?: ButtonVariant };

const Button = styled(m.button, {
  label: "Button",
  name: "Button",
})<ButtonProps>(
  ({ theme }) => ({
    cursor: "pointer",
    ...theme.vars.typography.button,
    ...theme.vars.shape,
    ...padding(theme.spacing(1), theme.spacing(2)),
    color: theme.vars.palette.text.primary,
    transitionDuration: `${theme.transitions.duration.standard}ms`,
    transitionProperty: "all",
    transitionTimingFunction: theme.vars.transitions.easing.sharp,
  }),
  ({ theme, variant }) =>
    (!variant || variant === "text") && {
      ":hover": {
        backgroundColor: rgba(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
      },
      backgroundColor: "transparent",
      border: 0,
      color: theme.vars.palette.primary.main,
    },
  ({ theme, variant }) =>
    variant === "outlined" && {
      ":hover": {
        backgroundcolor: rgba(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
        borderColor: theme.vars.palette.primary.main,
      },
      backgroundColor: "transparent",
      borderColor: rgba(theme.palette.primary.main, 0.5),
      borderWidth: 1,
      color: theme.vars.palette.primary.main,
    },
  ({ theme, variant }) =>
    variant === "solid" && {
      ":hover": {
        backgroundColor: theme.vars.palette.primary.dark,
      },
      backgroundColor: theme.vars.palette.primary.main,
      border: 0,
      color: theme.vars.palette.primary.contrastText,
    }
);

export default Button;
