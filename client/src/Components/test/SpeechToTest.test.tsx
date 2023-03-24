import { render, screen } from "@testing-library/react";
import SpeechToText from "../SpeechToText";

describe("SpeechToText", () => {
  test("renders speech component with title and buttons", () => {
    render(<SpeechToText isInterviewerSpeaking={false} onAnswerRecorded={() => {}} onSaveUserResponse={() => {}} />);
    const title = screen.getByText("Interviewee");
    const recordButton = screen.getByText("Record");
    const stopButton = screen.getByText("Stop");
    expect(title).toBeInTheDocument();
    expect(recordButton).toBeInTheDocument();
    expect(stopButton).toBeInTheDocument();
  });
});
