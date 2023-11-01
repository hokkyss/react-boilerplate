import { memo } from "react";

import useCounter from "./hooks/use-counter.hook";

const HomePage = memo(() => {
  const [counter, { decrease: decreaseCounter, increase: increaseCounter }] =
    useCounter();

  return (
    <div>
      <h1>Vite + React</h1>
      <button type="button">Toggle mode</button>
      <h5>{counter}</h5>
      <button onClick={decreaseCounter} type="button">
        Decrease Counter
      </button>
      <button onClick={increaseCounter} type="button">
        Increase Counter
      </button>
    </div>
  );
});

export default HomePage;
