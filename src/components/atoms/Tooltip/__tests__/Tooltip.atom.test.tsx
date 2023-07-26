import { act, render } from "../../../../../tests/test.util";
import Tooltip from "../Tooltip.atom";

/**
 * A bug in @testing-library/user-event@14 is explained in the issue below.
 * @see {@link https://github.com/testing-library/react-testing-library/issues/1197 github issue}
 */
beforeEach(() => {
  vi.useRealTimers();
});

afterEach(() => {
  vi.useFakeTimers();
});

describe("Tooltip", () => {
  it("should open on hover", async () => {
    const result = render(
      <Tooltip content="halo">
        <div data-testid="anchor-element">Hover this</div>
      </Tooltip>
    );

    const anchorElement = result.getByTestId("anchor-element");
    await act(async () => {
      await result.user.hover(anchorElement);
    });

    const tooltipContentContainer = result.queryByTestId("tooltip-content");
    expect(tooltipContentContainer).not.toBeNull();
  });
});
