import { render, screen, waitFor } from "@testing-library/react";
import Carlist from "./components/Carlist";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for tests
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Carlist tests", () => {
  test("component renders", () => {
    // Test that the Carlist component renders without crashing
    render(<Carlist />, { wrapper });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});

test("Carlist fetches and displays cars", async () => {
  render(<Carlist />, { wrapper });
  await waitFor(() => {
    expect(screen.getByText(/Add Car/i));
    expect(screen.getByText(/Ford/i)).toBeInTheDocument();
  });
});
