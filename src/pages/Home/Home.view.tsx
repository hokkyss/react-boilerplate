import styled from "@mui/system/styled";
import { motion } from "framer-motion";
import { between, padding, size } from "polished";
import { FunctionComponent } from "react";
import ReactLogo from "~/assets/react.svg";
import ViteLogo from "~/assets/vite.svg";
import useHomeViewModel from "./Home.viewModel";

const Container = styled(motion.div)(() => ({
  fontSize: between("20px", "30px", "400px", "1000px"),
}));
const Card = styled("div")`
  padding: 2em;
`;
const StyledViteLogo = styled(ViteLogo)`
  ${padding(20)}
  ${size(100, 100)}
`;

const StyledReactLogo = StyledViteLogo.withComponent(ReactLogo);

const HomeView: FunctionComponent = function HomeView() {
  const { counter, increase, decrease } = useHomeViewModel();

  return (
    <Container>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <StyledViteLogo />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <StyledReactLogo />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card>
        <button onClick={decrease} type="button">
          Decrease Count
        </button>
        <code>Count = {counter}</code>
        <button onClick={increase} type="button">
          Increase Count
        </button>
      </Card>
    </Container>
  );
};

export default HomeView;
