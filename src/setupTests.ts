import { setupServer } from "msw/node";

const server = setupServer();

beforeEach(() => {
  // tell vitest we use mocked time
  vi.useFakeTimers();
});

afterEach(() => {
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  server.resetHandlers();

  // restoring date after each test run
  vi.useRealTimers();
});

beforeAll(() => {
  // establish API mocking before all tests
  server.listen();
});

afterAll(() => {
  // clean up once the tests are done
  server.close();

  vi.clearAllMocks();
});
