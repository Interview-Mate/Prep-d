import { Accordion } from "flowbite-react";

function CoverLetterBuilderForm({
  CoverLetterData,
  setCoverLetterData,
  generatePDF,
}: any) {
  const handleKeywordChange = (event: { target: { value: any } }) => {
    const keyword = event.target.value;

    if (CoverLetterData.selectedKeywords.includes(keyword)) {
      setCoverLetterData({
        ...CoverLetterData,
        selectedKeywords: CoverLetterData.selectedKeywords.filter(
          (k: any) => k !== keyword
        ),
      });
    } else {
      setCoverLetterData({
        ...CoverLetterData,
        selectedKeywords: [...CoverLetterData.selectedKeywords, keyword],
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
                value={CoverLetterData.firstName}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.lastName}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.email}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.phoneNumber}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.street}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.city}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.zipCode}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.city}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.jobTitle}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.position}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.company}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.startDate}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                  value={CoverLetterData.description}
                  id="description"
                  onChange={(e) =>
                    setCoverLetterData({
                      ...CoverLetterData,
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
                value={CoverLetterData.workExperience}
                id="workExperience"
                rows={5}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                value={CoverLetterData.qualification}
                id="Qualification"
                rows={3}
                onChange={(e) =>
                  setCoverLetterData({
                    ...CoverLetterData,
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
                {CoverLetterData.keywords.map((keyword: any) => (
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
                      checked={CoverLetterData.selectedKeywords.includes(
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

        <div className="flex items-center justify-center">
          <button
            className="w-fit py-2 px-4 bg-dark-cyan text-black font-bold text-black hover:bg-african-violet-900 hover:text-seasalt rounded-md px-3 py-2 text-base font-medium"
            type="submit"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
}

export default CoverLetterBuilderForm;
