import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Box = styled(m.div, { label: "Box" })(({ theme }) => ({
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
}));

export default Box;
