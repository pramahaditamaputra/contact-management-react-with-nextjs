import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    media: "",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Provide a safe partial mock for react-query's useQueryClient so tests that
// call hooks which access the client don't fail when a provider isn't present.
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
    }),
  };
});

// Prevent real network requests from tests by mocking the shared axios client
// for the common path aliases used across the project. Individual tests that
// need the real axios instance (see src/shared/api/__test__/axios.test.ts) use
// `vi.importActual` to load the real module explicitly.
const defaultResponse = {
  users: [
    {
      id: "1",
      name: "Budi",
      phone: "0812",
      email: "[email protected]",
    },
  ],
  total: 1,
  skip: 0,
  limit: 1,
};

const mockApiClient = {
  get: vi.fn().mockImplementation(async () => ({ data: defaultResponse })),
  post: vi.fn().mockImplementation(async (_url: string, payload: any) => ({
    data: {
      users: [
        {
          id: "1",
          name: payload?.name ?? defaultResponse.users[0].name,
          phone: payload?.phone ?? defaultResponse.users[0].phone,
          email: payload?.email ?? defaultResponse.users[0].email,
        },
      ],
      total: 1,
      skip: 0,
      limit: 1,
    },
  })),
  put: vi.fn().mockImplementation(async (_url: string, payload: any) => ({
    data: {
      users: [
        {
          id: "1",
          name: payload?.name ?? defaultResponse.users[0].name,
          phone: payload?.phone ?? defaultResponse.users[0].phone,
          email: payload?.email ?? defaultResponse.users[0].email,
        },
      ],
      total: 1,
      skip: 0,
      limit: 1,
    },
  })),
  delete: vi.fn().mockResolvedValue(undefined),
  defaults: { baseURL: undefined, headers: { common: {} } },
};

vi.mock("@/src/shared/api/axios", () => ({ apiClient: mockApiClient }));
vi.mock("@/shared/api/axios", () => ({ apiClient: mockApiClient }));
