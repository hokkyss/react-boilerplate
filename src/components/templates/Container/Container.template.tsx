import styled from "@mui/system/styled";
import { m } from "framer-motion";
import { size } from "polished";

const Container = styled(m.div, {
  label: "AppContainer",
  name: "AppContainer",
})(({ theme }) => ({
  ...size("100vh", "100vw"),
  backgroundColor: theme.vars.palette.background.default,
}));

export default Container;
