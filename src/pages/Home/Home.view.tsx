import { between } from "polished";
import { FunctionComponent } from "react";
import ReactLogo from "~/assets/react.svg";
import ViteLogo from "~/assets/vite.svg";
import Box from "~/components/atoms/Box/Box.atom";
import Button from "~/components/atoms/Button/Button.atom";
import Heading1 from "~/components/atoms/Text/Heading1.atom";
import Tooltip from "~/components/atoms/Tooltip/Tooltip.atom";
import { Link, Logo } from "./Home.component";
import useHomeViewModel from "./Home.viewModel";

const HomeView: FunctionComponent = function HomeView() {
  const { colorScheme } = useHomeViewModel();

  return (
    <Box sx={{ fontSize: between("14px", "20px", "400px", "1000px") }}>
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
      <Heading1>Vite + React</Heading1>
      <Button
        onClick={() =>
          colorScheme.setMode(colorScheme.mode === "light" ? "dark" : "light")
        }
        type="button"
      >
        Toggle mode
      </Button>
    </Box>
  );
};

export default HomeView;
