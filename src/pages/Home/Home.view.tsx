import { FunctionComponent } from "react";
import ReactLogo from "~/assets/react.svg";
import ViteLogo from "~/assets/vite.svg";
import Box from "~/components/atoms/Box/Box.atom";
import Button from "~/components/atoms/Button/Button.atom";
import Text from "~/components/atoms/Text/Text.atom";
import Tooltip from "~/components/atoms/Tooltip/Tooltip.atom";
import { Container, Link, Logo } from "./Home.component";
import useHomeViewModel from "./Home.viewModel";

const HomeView: FunctionComponent = function HomeView() {
  const { colorScheme } = useHomeViewModel();

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip placement="left" content="Vite Logo">
          <Link href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <Logo as={ViteLogo} />
          </Link>
        </Tooltip>
        <Tooltip placement="right" content="halo saya disini">
          <Link href="https://reactjs.org" target="_blank" rel="noreferrer">
            <Logo as={ReactLogo} spin />
          </Link>
        </Tooltip>
      </Box>
      <Text.Heading1>Vite + React</Text.Heading1>
      <Button
        onClick={() =>
          colorScheme.setMode(colorScheme.mode === "light" ? "dark" : "light")
        }
        type="button"
      >
        Toggle mode
      </Button>
    </Container>
  );
};

export default HomeView;
