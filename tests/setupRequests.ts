import { setupServer } from "msw/node";
import mockJsonPlaceholder from "~/services/jsonplaceholder/__mocks__/jsonplaceholder.api.mock";

const server = setupServer(...mockJsonPlaceholder);

afterEach(() => {
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  server.resetHandlers();
});

beforeAll(() => {
  // establish API mocking before all tests
  server.listen();
});

afterAll(() => {
  // clean up once the tests are done
  server.close();
});
