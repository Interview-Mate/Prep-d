import { render } from "@testing-library/react";
import Spinner from "../Spinner";

describe("Spinner component", () => {
  it("renders the spinner", () => {
    const { getByRole } = render(<Spinner />);
    const spinner = getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("spinner has correct class name", () => {
    const { getByRole } = render(<Spinner />);
    const spinner = getByRole("status");
    expect(spinner).toHaveClass("text-center");
  });

  it("spinner has SVG element", () => {
    const { getByRole } = render(<Spinner />);
    const spinner = getByRole("status");
    expect(spinner.querySelector("svg")).toBeInTheDocument();
  });
});