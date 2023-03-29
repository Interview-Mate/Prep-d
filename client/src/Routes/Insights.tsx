import CodeInsights from './CodeInsights';
import InterviewInsights from './InterviewInsights';
import Navbar from '../Components/Navbar';

const Insights = () => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-row'>
        <InterviewInsights />
        <CodeInsights />
      </div>
    </div>
  );
};

export default Insights;
