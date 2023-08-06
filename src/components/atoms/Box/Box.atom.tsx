import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Box = styled(m.div, { label: "Box" })(({ theme }) => ({
  transitionDuration: `${theme.transitions.duration.standard}ms`,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
}));

export default Box;
