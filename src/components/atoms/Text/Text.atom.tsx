import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Text = styled(m.p, { label: "Text" })(({ theme }) => ({
  ...theme.vars.typography.body1,
  color: theme.vars.palette.text.primary,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
}));

export default Text;
