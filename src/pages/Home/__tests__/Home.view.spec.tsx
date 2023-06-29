import { render } from "~/utils/test.util";
import HomeView from "../Home.view";

describe("Home View", () => {
  it("should be defined", () => {
    expect(HomeView).toBeDefined();
  });

  it.skip("should match snapshot", () => {
    const snapshot = render(<HomeView />);

    expect(snapshot).toMatchSnapshot();
  });
});
