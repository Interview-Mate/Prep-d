import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Interviewer from "../Interviewer";

describe("Interviewer", () => {
  const videoQuestion = "What are your strengths?";
  const setIsInterviewerSpeaking = jest.fn();
  const video = true;

  it("renders the video question", () => {
    render(
      <Interviewer
        videoQuestion={videoQuestion}
        setIsInterviewerSpeaking={setIsInterviewerSpeaking}
        video={video}
      />
    );
    expect(screen.getByText(videoQuestion)).toBeInTheDocument();
  });

  it("speaks the video question after a delay", async () => {
    render(
      <Interviewer
        videoQuestion={videoQuestion}
        setIsInterviewerSpeaking={setIsInterviewerSpeaking}
        video={video}
      />
    );

    await waitFor(() => {
      expect(setIsInterviewerSpeaking).toHaveBeenCalledWith(true);
    });
    await waitFor(() => {
      expect(setIsInterviewerSpeaking).toHaveBeenCalledWith(false);
    });
  });

  it("uses the correct voice for the speech synthesis", async () => {
    render(
      <Interviewer
        videoQuestion={videoQuestion}
        setIsInterviewerSpeaking={setIsInterviewerSpeaking}
        video={video}
      />
    );

    await waitFor(() => {
      expect(window.speechSynthesis.getVoices().length).toBeGreaterThan(0);
    });

    const speakButton = screen.getByText(videoQuestion);
    userEvent.click(speakButton);

    const utterance = new SpeechSynthesisUtterance(videoQuestion);
    utterance.voice = window.speechSynthesis.getVoices().find(
      (voice) => voice.name === "Google UK English Male"
    ) || null;

    await waitFor(() => {
      expect(window.speechSynthesis.speak).toHaveBeenCalledWith(utterance);
    });
  });
});
