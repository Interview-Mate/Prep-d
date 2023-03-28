import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Spinner from "../Components/Spinner";
import {
  reviewPdfCoverLetter,
  reviewTextCoverLetter,
  improveCoverLetter,
} from "../Util/ApiService";

function parseReview(reviewStr: string) {
  const ratingMatch = reviewStr.match(/Rating: (\d+)/);
  const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;

  const reviewMatch = reviewStr.match(/Review: (.*) Improvement:/s);
  const review = reviewMatch ? reviewMatch[1].trim() : null;

  const improvementMatch = reviewStr.match(/Improvement: (.*)/s);
  const improvement = improvementMatch ? improvementMatch[1].trim() : null;

  return {
    rating,
    review,
    improvement,
  };
}

const CoverLetterReviewer = () => {
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const [showTextUpload, setShowTextUpload] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string | null>("");
  const [improvement, setImprovement] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const handlePdfUpload = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    setLoading(true);
    const dataForm = new FormData();
    dataForm.append("file", event.target.file.files[0]);
    const response = await reviewPdfCoverLetter(dataForm);
    const { rating, review, improvement } = parseReview(response.response);
    setText(response.text);
    setRating(rating);
    setReview(review);
    setImprovement(improvement);
    setLoading(false);
    console.log(response);
  };

  const handleTextUpload = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    setLoading(true);
    const response = await reviewTextCoverLetter(textInput);
    const { rating, review, improvement } = parseReview(response.response);
    setText(response.text);
    setRating(rating);
    setReview(review);
    setImprovement(improvement);
    setLoading(false);
    console.log(response);
  };

  const handleImprove = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    setLoading(true);
    const response = await improveCoverLetter(text);
  };

  return (
    <div>
      <Navbar />
      {!loading ? (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className=" h-full p-10 space-y-8 bg-white rounded-md shadow">
            {review === "" && !loading && (
              <div className="max-w-md">
                <div>
                  <h2 className="text-center text-3xl font-bold tracking-tight ">
                    Analyze your cover letter
                  </h2>
                </div>

                <div className="flex flex-row items-center justify-center text-xl font-bold">
                  <span
                    className="text-sm m-5 bg-white hover:opacity-75 active:opacity-100 text-african-violet-900 border-african-violet-900 border-solid border-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    onClick={() => {
                      setShowPDFUpload(!showPDFUpload);
                      setShowTextUpload(false);
                    }}
                  >
                    Upload PDF
                  </span>
                  <span
                    className="text-sm m-5 bg-white hover:opacity-75 active:opacity-100 text-african-violet-900 border-african-violet-900 border-solid border-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    onClick={() => {
                      setShowTextUpload(!showTextUpload);
                      setShowPDFUpload(false);
                    }}
                  >
                    Upload Text
                  </span>
                </div>
                {showPDFUpload && (
                  <form
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                    id="uploadForm"
                    encType="multipart/form-data"
                    onSubmit={handlePdfUpload}
                  >
                    <div className="flex align-middle h-20">
                      <div className="flex flex-col w-full">
                        <label
                          className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="file_input"
                        >
                          <input
                            className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file"
                            name="image"
                            type="file"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full bg-african-violet-900 hover:opacity-75 active:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Analyze
                      </button>
                    </div>
                  </form>
                )}
                {showTextUpload && (
                  <form
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={handleTextUpload}
                  >
                    <div className="flex align-middle ">
                      <div className="flex flex-col w-full ">
                        <label
                          className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="text_input"
                        >
                          <textarea
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 active:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="text-input"
                            name="text"
                            value={textInput}
                            onChange={(
                              event: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setTextInput(event.target.value)}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full bg-african-violet-900 hover:opacity-75 active:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Analyze
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
            {review !== "" && !loading && (
              <div className="max-w-xl flex flex-col items-center justify-center">
                <h2 className="text-center text-xl m-5 font-bold tracking-tight ">
                  Review
                </h2>
                <div className="flex flex-col items-center justify-center text-sm">
                  <span>
                    <span className="font-bold">{rating}</span>/5
                  </span>

                  <div className="flex flex-row m-5 text-sm">
                    <div className="m-5 w-1/2">
                      <span className="font-bold">Review</span> <br />
                      {review}
                    </div>
                    <div className="m-5 w-1/2">
                      <span className="font-bold">Improvements</span> <br />
                      {improvement}
                    </div>
                  </div>
                  <button
                    onClick={handleImprove}
                    className="w-full bg-african-violet-900 hover:opacity-75 active:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Improve
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
          <h2 className="mt-5 text-center text-2xl font-bold tracking-tight ">
            Analyzing
          </h2>
        </div>
      )}
    </div>
  );
};

export default CoverLetterReviewer;
