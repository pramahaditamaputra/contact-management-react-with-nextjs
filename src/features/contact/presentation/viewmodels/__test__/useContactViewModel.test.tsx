/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const dispatchMock = vi.fn();

vi.mock("@/src/store/hooks", () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: (selector: any) =>
    selector({ contactPagination: { pageIndex: 0, pageSize: 5 } }),
}));

vi.mock("../queries/useContactsQuery", () => ({
  useContactsQuery: () => ({
    data: [],
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: vi.fn(),
  }),
}));
vi.mock("../components/data-table/columns-contact", () => ({
  __esModule: true,
  default: () => [],
}));

import useContactViewModel from "../useContactViewModel";

const TestComponent = () => {
  const vm = useContactViewModel();

  React.useEffect(() => {
    vm.pagination.onPaginationChange({ pageIndex: 1, pageSize: 5 } as any);
  }, [vm.pagination]);

  return null;
};

describe("useContactViewModel hook integration", () => {
  it("calls dispatch when pagination changes", () => {
    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <TestComponent />
      </QueryClientProvider>,
    );
    expect(dispatchMock).toHaveBeenCalled();
  });
});
