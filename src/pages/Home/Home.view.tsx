import { FunctionComponent } from "react";
import ReactLogo from "~/assets/react.svg";
import ViteLogo from "~/assets/vite.svg";
import { Card, Container, Link, Logo } from "./Home.component";
import useHomeViewModel from "./Home.viewModel";

const HomeView: FunctionComponent = function HomeView() {
  const { counter, increase, decrease } = useHomeViewModel();

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
