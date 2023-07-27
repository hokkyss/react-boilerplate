import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Heading2 = styled(m.h2, { label: "Heading2" })(({ theme }) => ({
  ...theme.vars.typography.h2,
  color: theme.vars.palette.text.primary,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
}));

export default Heading2;
