import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InterviewForm from "../InterviewForm";

describe("InterviewForm component", () => {
  it("renders the form inputs and buttons", () => {
    render(<InterviewForm onFormSubmit={() => {}} />);
    expect(screen.getByLabelText("Company Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Level:")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Field:")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Title:")).toBeInTheDocument();
    expect(screen.getByLabelText("Video?")).toBeInTheDocument();
    expect(screen.getByText("Start Interview")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("updates the input values when the user types", () => {
    render(<InterviewForm onFormSubmit={() => {}} />);
    const companyNameInput = screen.getByLabelText("Company Name:");
    const jobLevelInput = screen.getByLabelText("Job Level:");
    const jobFieldInput = screen.getByLabelText("Job Field:");
    const jobTitleInput = screen.getByLabelText("Job Title:");

    fireEvent.change(companyNameInput, { target: { value: "Codeworks" } });
    expect(companyNameInput).toHaveValue("Codeworks");

    fireEvent.change(jobLevelInput, { target: { value: "Senior" } });
    expect(jobLevelInput).toHaveValue("Senior");

    fireEvent.change(jobFieldInput, { target: { value: "Software Engineering" } });
    expect(jobFieldInput).toHaveValue("Software Engineering");

    fireEvent.change(jobTitleInput, { target: { value: "Software Engineer" } });
    expect(jobTitleInput).toHaveValue("Software Engineer");
  });

  it("updates the video checkbox when the user clicks it", () => {
    render(<InterviewForm onFormSubmit={() => {}} />);
    const videoCheckbox = screen.getByLabelText("Video?");
    expect(videoCheckbox).toBeChecked();
    fireEvent.click(videoCheckbox);
    expect(videoCheckbox).not.toBeChecked();
  });
});
