import ProblemList from "./Coding/ProblemList";
import Navbar from "../Components/Navbar";

const CodingDashboard = () => {
  return (
    <div className="h-screen w-screen bg-seasalt">
      <Navbar />
      <div>
        <ProblemList dashboard={false} />
      </div>
    </div>
  );
};

export default CodingDashboard;
