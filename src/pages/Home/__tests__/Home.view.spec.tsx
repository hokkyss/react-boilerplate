import { render } from "../../../../tests/test.util";
import HomeView from "../Home.view";

describe("Home View", () => {
  it("should be defined", () => {
    expect(HomeView).toBeDefined();
  });

  it("should match snapshot", () => {
    const snapshot = render(<HomeView />);

    expect(snapshot).toMatchSnapshot();
  });
});
