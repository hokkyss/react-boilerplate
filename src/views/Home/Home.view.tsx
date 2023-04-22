import React, { FunctionComponent } from "react";

import reactLogo from "~/assets/react.svg";
import viteLogo from "~/assets/vite.svg";
import styles from "./Home.module.css";
import useHomeViewModel from "./Home.viewModel";

const HomeView: FunctionComponent = function HomeView() {
  const { counter, increase, decrease, random } = useHomeViewModel();

  return (
    <div className={styles.app}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className={styles.logo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button onClick={decrease} type="button">
          Decrease Count
        </button>
        <code>Count = {counter}</code>
        <button onClick={increase} type="button">
          Increase Count
        </button>
      </div>
      <code>Random = {random}</code>
    </div>
  );
};

export default HomeView;
