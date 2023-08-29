import { render } from "../../../../tests/test.util";
import HomePage from "../Home.page";

describe("Home Page", () => {
  it("should be defined", () => {
    expect(HomePage).toBeDefined();
  });

  it("should match snapshot", () => {
    const snapshot = render(<HomePage />);

    expect(snapshot).toMatchSnapshot();
  });
});
