import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Heading5 = styled(m.h5, { label: "Heading5" })(({ theme }) => ({
  ...theme.vars.typography.h5,
  color: theme.vars.palette.text.primary,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
}));

export default Heading5;
