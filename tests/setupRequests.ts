import { setupServer } from "msw/node";
import mockPostsApi from "~/services/jsonplaceholder/endpoints/posts/__mocks__/posts.api.mock";
import mockUsersApi from "~/services/jsonplaceholder/endpoints/users/__mocks__/users.api.mock";

const server = setupServer(...mockUsersApi, ...mockPostsApi);

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
