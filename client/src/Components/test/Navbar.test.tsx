import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";

describe("Navbar", () => {
  it("renders the Prep'd logo", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logo = screen.getByAltText("Prep'd");
    expect(logo).toBeInTheDocument();
  });

  it("toggles the mobile menu on click", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const menuButton = screen.getByRole("button", { name: "Open main menu" });
    expect(screen.queryByText("Insights")).not.toBeInTheDocument();
    userEvent.click(menuButton);
    expect(screen.getByText("Insights")).toBeInTheDocument();
    userEvent.click(menuButton);
    expect(screen.queryByText("Insights")).not.toBeInTheDocument();
  });

  it("opens the Interview Practice menu on click", async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const practiceButton = screen.getByRole("button", {
      name: "Interview Practice",
    });
    expect(screen.queryByText("Coding Challenges")).not.toBeInTheDocument();
    userEvent.click(practiceButton);
    const codingChallenges = await screen.findByText("Coding Challenges");
    expect(codingChallenges).toBeInTheDocument();
    userEvent.click(practiceButton);
    expect(screen.queryByText("Coding Challenges")).not.toBeInTheDocument();
  });

  it("opens the Build Application menu on click", async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const buildButton = screen.getByRole("button", {
      name: "Build Application",
    });
    expect(screen.queryByText("Cover Letter Reviewer")).not.toBeInTheDocument();
    userEvent.click(buildButton);
    const coverLetterReviewer = await screen.findByText("Cover Letter Reviewer");
    expect(coverLetterReviewer).toBeInTheDocument();
    userEvent.click(buildButton);
    expect(screen.queryByText("Cover Letter Reviewer")).not.toBeInTheDocument();
  });
});