import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Heading3 = styled(m.h3, { label: "Heading3" })(({ theme }) => ({
  ...theme.vars.typography.h3,
  color: theme.vars.palette.text.primary,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
}));

export default Heading3;
