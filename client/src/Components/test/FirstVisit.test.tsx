import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FirstVisit from "../FirstVisit";
import { Context } from "../../Context";

describe("FirstVisit component", () => {
  it("should call handleCreateUser when form is submitted with valid data", () => {
    const handleCreateUser = jest.fn();
    const user = { email: "test@example.com" };
    render(
      <Context.Provider value={{ handleCreateUser, user }}>
        <FirstVisit />
      </Context.Provider>
    );

    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const skillLevelInput = screen.getByLabelText("Skill level");
    const submitButton = screen.getByText("Get me going");

    fireEvent.change(firstNameInput, { target: { value: "Barry" } });
    fireEvent.change(lastNameInput, { target: { value: "Manilow" } });
    fireEvent.change(skillLevelInput, { target: { value: "frontend" } });
    fireEvent.click(submitButton);

    expect(handleCreateUser).toHaveBeenCalledTimes(1);
    expect(handleCreateUser).toHaveBeenCalledWith({
      name: "Barry",
      surname: "Mainlow",
      level: "frontend",
      email: "test@example.com",
    });
  });

  it("should display error messages for missing form fields", () => {
    render(
      <Context.Provider value={{ handleCreateUser: jest.fn(), user: {} }}>
        <FirstVisit />
      </Context.Provider>
    );

    const submitButton = screen.getByText("Get me going");

    fireEvent.click(submitButton);

    expect(screen.getByText("First name")).toHaveClass("text-red-500");
    expect(screen.getByText("Last name")).toHaveClass("text-red-500");
    expect(screen.getByText("Skill level")).toHaveClass("text-red-500");
  });
});
