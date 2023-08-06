vi.mock("react-dom", async (importOriginal) => {
  const ReactDOM = await importOriginal<object>();

  return {
    ...ReactDOM,
    createPortal: vi.fn((element, _) => element),
  };
});

vi.mock("react", async () => {
  const react = await vi.importActual<object>("react");

  return {
    ...react,
    useCallback: vi.fn((val) => val),
    useMemo: vi.fn((val) => val()),
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});
