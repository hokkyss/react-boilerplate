import { FunctionComponent } from "react";
import ReactLogo from "~/assets/react.svg";
import ViteLogo from "~/assets/vite.svg";
import Button from "~/components/atoms/Button/Button.atom";
import { Card, Container, Link, Logo } from "./Home.component";
import useHomeViewModel from "./Home.viewModel";

const HomeView: FunctionComponent = function HomeView() {
  const { counter, colorScheme } = useHomeViewModel();

  return (
    <Container>
      <div>
        <Link href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Logo as={ViteLogo} />
        </Link>
        <Link href="https://reactjs.org" target="_blank" rel="noreferrer">
          <Logo as={ReactLogo} spin />
        </Link>
      </div>
      <h1>Vite + React</h1>
      <Card>
        <Button onClick={counter.decrease} type="button">
          Decrease Count
        </Button>
        <p>Count = {counter.value}</p>
        <Button onClick={counter.increase} type="button">
          Increase Count
        </Button>
      </Card>
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
