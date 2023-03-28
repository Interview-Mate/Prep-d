import { Accordion } from "flowbite-react";

function ResumeBuilderForm({
  ResumeData,
  setResumeData,
  generatePDF,
}: any) {
  const handleKeywordChange = (event: { target: { value: any } }) => {
    const keyword = event.target.value;

    if (ResumeData.selectedKeywords.includes(keyword)) {
      setResumeData({
        ...ResumeData,
        selectedKeywords: ResumeData.selectedKeywords.filter(
          (k: any) => k !== keyword
        ),
      });
    } else {
      setResumeData({
        ...ResumeData,
        selectedKeywords: [...ResumeData.selectedKeywords, keyword],
      });
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    generatePDF();
  };

  return (
    <div className="shadow mr-8 p-4 h-full min-h-max w-full flex flex-col bg-white text-sm">
      <form onSubmit={handleSubmit} className="mb-0">
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>Your Details</Accordion.Title>
            <Accordion.Content>
              <label
                className="block text-gray-700 text-sm font-bold mt-5 mb-2 ml-1"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="firstName"
                value={ResumeData.firstName}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    firstName: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="lastName"
                value={ResumeData.lastName}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    lastName: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                value={ResumeData.email}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    email: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                id="phoneNumber"
                value={ResumeData.phoneNumber}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="street"
              >
                Street
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="street"
                value={ResumeData.street}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    street: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="city"
                value={ResumeData.city}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    city: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="zipCode"
                value={ResumeData.zipCode}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    zipCode: e.target.value,
                  })
                }
              />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="state"
              >
                State
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2 mb-3 text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="state"
                value={ResumeData.city}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    city: e.target.value,
                  })
                }
              />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Job details</Accordion.Title>
            <Accordion.Content>
              <label
                className="block text-gray-700 text-sm font-bold mt-5 mb-2 ml-1"
                htmlFor="jobTitle"
              >
                Job Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="jobTitle"
                value={ResumeData.jobTitle}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    jobTitle: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="company"
              >
                Position
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="position"
                value={ResumeData.position}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    position: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="company"
              >
                Company
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="company"
                value={ResumeData.company}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    company: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="company"
              >
                Start Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-2  text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                id="startDate"
                min={new Date().toISOString().split("T")[0]}
                value={ResumeData.startDate}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    startDate: e.target.value,
                  })
                }
              />
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="company"
              >
                Description
                <textarea
                  className="shadow appearance-none border rounded w-full py-1 px-2 mt-2 mb-3 text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
                  value={ResumeData.description}
                  id="description"
                  onChange={(e) =>
                    setResumeData({
                      ...ResumeData,
                      description: e.target.value,
                    })
                  }
                />
              </label>{" "}
              <br />
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Work experience</Accordion.Title>
            <Accordion.Content>
              <label
                className="block text-gray-700 text-sm font-bold mt-3 mb-2 ml-1"
                htmlFor="workExperience"
              >
                Work Experience
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={ResumeData.workExperience}
                id="workExperience"
                rows={5}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    workExperience: e.target.value,
                  })
                }
              />{" "}
              <br />
              <label
                className="block text-gray-700 text-sm font-bold mt-2 mb-2 ml-1"
                htmlFor="Qualification"
              >
                Qualification
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={ResumeData.qualification}
                id="Qualification"
                rows={3}
                onChange={(e) =>
                  setResumeData({
                    ...ResumeData,
                    qualification: e.target.value,
                  })
                }
              />{" "}
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Keywords</Accordion.Title>
            <Accordion.Content>
              <div className="mt-2  ">
                {ResumeData.keywords.map((keyword: any) => (
                  <label
                    key={keyword}
                    htmlFor={keyword}
                    className="block text-gray-700 text-base mb-2"
                  >
                    <input
                      className="mr-2 "
                      id={keyword}
                      type="checkbox"
                      value={keyword}
                      checked={ResumeData.selectedKeywords.includes(
                        keyword
                      )}
                      onChange={handleKeywordChange}
                    />
                    <span className="ml-2">{keyword}</span>
                  </label>
                ))}
              </div>{" "}
              <br />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
        <br />

        <div className="flex justify-center">
          <button className="form-button" type="submit">
            Generate
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeBuilderForm;
