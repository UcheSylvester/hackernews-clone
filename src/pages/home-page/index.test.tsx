import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from ".";

describe("HomePage", () => {
  it("renders without crashing", () => {
    render(<HomePage />);
  });

  it("renders the title", () => {
    render(<HomePage />);
    expect(screen.getByText("Hacker News")).toBeInTheDocument();
  });
});
