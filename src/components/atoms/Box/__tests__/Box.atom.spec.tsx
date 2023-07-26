import { render } from "../../../../../tests/test.util";
import Box from "../Box.atom";

describe("Box.atom.tsx", () => {
  it("should be defined", () => {
    expect(Box).toBeDefined();
  });

  it("should match snapshor", () => {
    const snapshot = render(<Box />);

    expect(snapshot).toMatchSnapshot();
  });
});
