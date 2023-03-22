import React, { useState } from "react";

type InterviewFormProps = {
  onFormSubmit: (values: { companyName: string; jobLevel: string; jobField: string; jobTitle: string }) => void;
};

const InterviewForm: React.FC<InterviewFormProps> = ({
  onFormSubmit,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [jobField, setJobField] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      companyName,
      jobLevel,
      jobField,
      jobTitle,
    };

    onFormSubmit(formValues);
  };

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
        <button type="submit">Start Interview</button>
        <button type="button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;
