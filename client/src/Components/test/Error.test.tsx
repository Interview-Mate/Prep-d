import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../Error";
import { useRouteError } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useRouteError: jest.fn(),
}));

describe("ErrorPage component", () => {
  it("renders the error message when an error is present", () => {
    const errorMessage = "Something went wrong!";
    (useRouteError as jest.Mock).mockReturnValue({ message: errorMessage });
    render(<ErrorPage />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText("Sorry, an unexpected error has occurred.")).toBeInTheDocument();
  });

  it("renders the default error message when no error is present", () => {
    (useRouteError as jest.Mock).mockReturnValue(undefined);
    render(<ErrorPage />);

    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("Sorry, an unexpected error has occurred.")).toBeInTheDocument();
    expect(screen.getByText(/unknown error/i)).toBeInTheDocument();
  });
});
