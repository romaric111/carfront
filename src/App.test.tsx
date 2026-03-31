import { describe, test, expect } from "vitest";
import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App tests", () => {
  test("component renders", () => {
    // Test that the App component renders without crashing
    render(<App />);
    expect(screen.getByText(/CarShop/i)).toBeDefined();
  });
});
