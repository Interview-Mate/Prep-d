import React, { useState, useContext } from "react";
import { Context } from "../Context";

export default function InterviewForm({ onFormSubmit }: InterviewFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [jobField, setJobField] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [video, setVideo] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      companyName,
      jobLevel,
      jobField,
      jobTitle,
      video,
    };

    onFormSubmit(formValues);
  };

  return (
    <div className="interview-form">
      <h2 className="form-title">Live Interviews</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="company-name" className="form-label">
            Company Name:
          </label>
          <input
            type="text"
            id="company-name"
            required
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-level" className="form-label">
            Job Level:
          </label>
          <input
            type="text"
            required
            id="job-level"
            value={jobLevel}
            onChange={(event) => setJobLevel(event.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-field" className="form-label">
            Job Field:
          </label>
          <input
            type="text"
            required
            id="job-field"
            value={jobField}
            onChange={(event) => setJobField(event.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-title" className="form-label">
            Job Title:
          </label>
          <input
            type="text"
            required
            id="job-title"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="video" className="form-label">
            Video?
          </label>
          <div className="form-checkbox-container">
            <input
              type="checkbox"
              id="video"
              value={video.toString()}
              checked={video}
              onChange={(event) => setVideo(event.target.checked)}
              className="form-checkbox"
            />
            {video && (
              <span className="form-checkbox-message">
                (You will be recorded for your training purposes)
              </span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">
            Start Interview
          </button>
          <button type="button" className="form-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
