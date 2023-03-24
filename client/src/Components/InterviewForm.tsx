import React, { useState, useContext } from "react";
import { Context } from '../Context';

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
console.log(video)

  return (
    <div className="interview-form">
      <h2>Practice Interviews</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="company-name">Company Name:</label>
        <input
          type="text"
          id="company-name"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
        />
        <br />
        <label htmlFor="job-level">Job Level:</label>
        <input
          type="text"
          id="job-level"
          value={jobLevel}
          onChange={(event) => setJobLevel(event.target.value)}
        />
        <br />
        <label htmlFor="job-field">Job Field:</label>
        <input
          type="text"
          id="job-field"
          value={jobField}
          onChange={(event) => setJobField(event.target.value)}
        />
        <br />
        <label htmlFor="job-title">Job Title:</label>
        <input
          type="text"
          id="job-title"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
        />
        <br />
        <label htmlFor="job-title">Video?</label>
        <input
          type="checkbox"
          id="video"
          value={video.toString()}
          checked={video}
          onChange={(event) => setVideo(event.target.checked)}
        />
        <br />
        <button type="submit">Start Interview</button>
        <button type="button">
          Cancel
        </button>
      </form>
    </div>
  );
}