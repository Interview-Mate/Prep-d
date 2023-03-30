import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import CVBuilderForm from "../Components/CoverLetterBuilder/CoverLetterBuilderForm";
import CVBuilderText from "../Components/CoverLetterBuilder/CoverLetterBuilderText";
import * as ApiService from "../Util/ApiService";
import Spinner from "../Components/Spinner";

const CoverLetterBuilder = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [CoverLetterData, setCoverLetterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    zipCode: "",
    city: "",
    workExperience: "",
    qualification: "",
    position: "",
    jobTitle: "",
    company: "",
    startDate: "",
    description: "",
    keywords: [
      "Agile",
      "Leadership",
      "Project Management",
      "Teamwork",
      "Communication",
      "Problem Solving",
      "Time Management",
      "Technical Skills",
      "Creativity",
      "Adaptability",
      "Scalability",
      "React",
      "Angular",
    ],
    selectedKeywords: [],
    textBody: "",
  });
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    const coverLetterRequest = {
      firstName: CoverLetterData.firstName,
      lastName: CoverLetterData.lastName,
      workExperience: CoverLetterData.workExperience,
      qualification: CoverLetterData.qualification,
      position: CoverLetterData.position,
      jobTitle: CoverLetterData.jobTitle,
      company: CoverLetterData.company,
      startDate: CoverLetterData.startDate,
      description: CoverLetterData.description,
      selectedKeywords: CoverLetterData.selectedKeywords,
    };
    const response = await ApiService.createCoverLetter(coverLetterRequest);
    setCoverLetterData({ ...CoverLetterData, textBody: response });
  };

  useEffect(() => {
    if (CoverLetterData.textBody !== "") {
      setShowPDF(true);
      setLoading(false);
    }
  }, [CoverLetterData]);

  return (
    <div className="h-screen w-screen bg-seasalt">
      <Navbar />

      <div className="flex flex-row h-full w-full">
        <div className="w-1/4 bg-black">
          <CVBuilderForm
            CoverLetterData={CoverLetterData}
            setCoverLetterData={setCoverLetterData}
            generatePDF={generatePDF}
          />
        </div>
        <div className="w-3/4">
          {loading && (
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Spinner />
                <p className="mt-10 text-2xl font-bold">Generating...</p>
              </div>
            </div>
          )}
          {showPDF && !loading && (
            <CVBuilderText CoverLetterData={CoverLetterData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
