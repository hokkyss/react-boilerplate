import type { FunctionComponent } from "react";

import { between } from "polished";

import ReactLogo from "~/assets/react.svg";
import ViteLogo from "~/assets/vite.svg";
import Badge from "~/components/atoms/Badge/Badge.atom";
import Box from "~/components/atoms/Box/Box.atom";
import Button from "~/components/atoms/Button/Button.atom";
import Heading1 from "~/components/atoms/Text/Heading1.atom";
import Heading5 from "~/components/atoms/Text/Heading5.atom";
import Tooltip from "~/components/molecules/Tooltip/Tooltip.atom";

import { Link, Logo } from "./Home.component";
import useHomeViewModel from "./Home.viewModel";

const HomeView: FunctionComponent = function HomeView() {
  const { colorScheme, counter, decreaseCounter, increaseCounter } =
    useHomeViewModel();

  return (
    <Box sx={{ fontSize: between("14px", "20px", "400px", "1000px") }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip content="Vite Logo" placement="left">
          <Badge content={500}>
            <Link href="https://vitejs.dev" rel="noreferrer" target="_blank">
              <Logo as={ViteLogo} />
            </Link>
          </Badge>
        </Tooltip>
        <Tooltip content="halo saya disini" placement="right">
          <Link href="https://reactjs.org" rel="noreferrer" target="_blank">
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
        variant="solid"
      >
        Toggle mode
      </Button>
      <Heading5>{counter}</Heading5>
      <Button onClick={decreaseCounter} type="button" variant="outlined">
        Decrease Counter
      </Button>
      <Button onClick={increaseCounter} type="button" variant="text">
        Increase Counter
      </Button>
    </Box>
  );
};

export default HomeView;
