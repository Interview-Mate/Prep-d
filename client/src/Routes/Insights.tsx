/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getSolvedProblems, getAllSolvedProblems } from "../Util/ApiService";
import { prettifyTime } from "../Util/CodeEditorHelpers";
import { useContext } from "react";
import { Context } from "../Context";
import Navbar from "../Components/Navbar";

const level: Dict = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
  4: "Expert",
};

const Insights = () => {
  const [solvedProblems, setSolvedProblems] = useState<SolvedProblem[]>([]);
  const [allSolvedProblems, setAllSolvedProblems] = useState<SolvedProblem[]>(
    []
  );
  const [usersAverageSolveTime, setUsersAverageSolveTime] = useState<
    number | undefined
  >();
  const [allAverageSolveTimes, setAllAverageSolveTimes] = useState<
    number | undefined
  >();
  const { currentUser } = useContext(Context) as any;

  useEffect(() => {
    const fetchData = async () => {
      const receivedUsersSolvedProblems = await getSolvedProblems(
        currentUser.id
      );
      setSolvedProblems(receivedUsersSolvedProblems);

      const receivedAllSolvedProblems = await getAllSolvedProblems();
      setAllSolvedProblems(receivedAllSolvedProblems);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(!allSolvedProblems.length) return;

    setUsersAverageSolveTime(
      solvedProblems.reduce((acc, curr) => acc + curr.solveTime, 0) /
        solvedProblems.length
    );

    setAllAverageSolveTimes(
      allSolvedProblems.reduce((acc, curr) => acc + curr.solveTime, 0) /
        allSolvedProblems.length
    );

    
  }, [allSolvedProblems]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Your progress",
      },
    },
  };

  const labels = solvedProblems.map((problem, i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: "Level",
        data: solvedProblems.map((problem) => problem.exercise?.level),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Solve time",
        data: solvedProblems.map((problem) => problem.solveTime / 1000),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="h-screen w-screen bg-seasalt">
      <Navbar />
      <div className="p-20 mt-10 h-4/5 w-full transition duration-200 ease-in-out">
        <div
          className="border border-teal-600 rounded-md mt-5 p-4 h-4/5 min-h-max w-full flex flex-col"
          style={{ background: "rgba(252, 252, 252, 1)" }}
        >
          {solvedProblems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-bold">You have not solved any problems yet</h1>
              <h2 className="text-xl mt-5">Solve some problems to see your progress</h2>
            </div>
          )}
          {solvedProblems.length !== 0 && usersAverageSolveTime !== 0 && (
            <div className="flex flex-row items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center w-1/4">
                <h2 className="text-sm ">Completed challenges:</h2>
                <h3 className="text-sm font-bold">{solvedProblems.length}</h3>
                <h2 className="text-sm mt-5">Score:</h2>

                <h3 className="text-sm font-bold">
                  {solvedProblems.reduce(
                    (acc, curr) => acc + curr.exercise!.level,
                    0
                  ) * 100}
                </h3>
                <h2 className="text-sm mt-5">Your level: </h2>
                <h3 className="text-sm font-bold">
                  {
                    level[
                      Math.round(
                        solvedProblems.reduce(
                          (acc, curr) => acc + curr.exercise!.level,
                          0
                        ) / solvedProblems.length
                      )
                    ]
                  }
                </h3>
                <h2 className="text-sm mt-5">Average solve time:</h2>
                {usersAverageSolveTime && (
                  <h3 className="text-sm font-bold">
                    {prettifyTime(usersAverageSolveTime)}
                  </h3>
                )}

                <h2 className="text-sm mt-5">
                  Your solve time compared to the average:
                </h2>
                {usersAverageSolveTime && allAverageSolveTimes && (
                  <h3 className="text-sm font-bold">
                    {usersAverageSolveTime < allAverageSolveTimes ? (
                      <span className="text-green-500">
                        {prettifyTime(
                          allAverageSolveTimes - usersAverageSolveTime
                        )}{" "}
                        faster
                      </span>
                    ) : (
                      <span className="text-red-500">
                        {prettifyTime(
                          usersAverageSolveTime - allAverageSolveTimes
                        )}{" "}
                        slower
                      </span>
                    )}
                  </h3>
                )}
              </div>
              <div className="flex flex-row items-center justify-center  h-full w-2/4 m-5">
                <Line options={options} data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;
