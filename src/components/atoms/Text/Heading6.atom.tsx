import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Heading6 = styled(m.h6, { label: "Heading6" })(({ theme }) => ({
  ...theme.vars.typography.h6,
  color: theme.vars.palette.text.primary,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
}));

export default Heading6;
