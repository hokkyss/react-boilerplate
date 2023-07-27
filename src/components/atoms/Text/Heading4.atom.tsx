import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Heading4 = styled(m.h4, { label: "Heading4" })(({ theme }) => ({
  ...theme.vars.typography.h4,
  color: theme.vars.palette.text.primary,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
}));

export default Heading4;
