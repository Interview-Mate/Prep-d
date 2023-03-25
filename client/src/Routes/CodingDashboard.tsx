import ProblemList from "./Coding/ProblemList";
import Navbar from "../Components/Navbar";

const CodingDashboard = () => {
  return (
    <div className="h-screen w-screen bg-seasalt">
      <Navbar />
      <div className="h-1/2 w-1/2 m-auto mt-20">
        <ProblemList dashboard={false} />
      </div>
    </div>
  );
};

export default CodingDashboard;
