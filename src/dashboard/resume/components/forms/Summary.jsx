import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const promptTemplate = "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience levels Fresher level Mid level and Experienced level in 4-5 lines in array format, With summary and experience_level Field in JSON Format";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState(resumeInfo?.summary || '');
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (summary) {
      setResumeInfo({ ...resumeInfo, summary });
    }
  }, [summary]);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const prompt = promptTemplate.replace('{jobTitle}', resumeInfo?.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const summaries = JSON.parse(result.response.text());
      setAiGeneratedSummaryList(summaries);
    } catch (error) {
      console.error(error); // Log the error
      toast.error("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { summary };

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, { data });
      toast.success('Details updated', {
        duration: 1000,
        style: { backgroundColor: 'green', color: 'white' },
      });
      enabledNext(true);
    } catch (error) {
      console.error(error); // Log the error
      toast.error('Failed to update details', {
        duration: 1000,
        style: { backgroundColor: 'red', color: 'white' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add a summary for your job title</p>

        <form className='mt-7' onSubmit={handleSave}>
          <div className='flex justify-between items-end'>
            <label>Add summary</label>
            <Button
              variant="outline"
              onClick={generateSummaryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className='h-4 w-4' /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList.length > 0 && (
        <div className='my-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'
            >
              <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// PropTypes validation
Summary.propTypes = {
  enabledNext: PropTypes.func.isRequired,
};

export default Summary;
