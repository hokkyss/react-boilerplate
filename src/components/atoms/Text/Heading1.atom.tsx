import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Heading1 = styled(m.h1, { label: "Heading1" })(({ theme }) => ({
  ...theme.vars.typography.h1,
  color: theme.vars.palette.text.primary,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
}));

export default Heading1;
