import ProblemList from '../Components/Coding/ProblemList';
import Navbar from '../Components/Navbar';

const CodingDashboard = () => {
  return (
    <div>
      <Navbar />
      <ProblemList dashboard={false} />
    </div>
  );
};

export default CodingDashboard;
