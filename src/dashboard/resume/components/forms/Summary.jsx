import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState(resumeInfo?.summary || '');
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (summary) {
      setResumeInfo({ ...resumeInfo, summary });
    }
  }, [summary]);

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
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 animate-fadeIn'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add a summary for your job title</p>

        <form className='mt-7' onSubmit={handleSave}>
          <div className='flex justify-between items-end animate-fadeIn'>
            <label>Add summary</label>
          </div>
          <Textarea
            className="mt-5 transition-all animate-fadeIn"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading} className="transition-all button-item animate-fadeIn">
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// PropTypes validation
Summary.propTypes = {
  enabledNext: PropTypes.func.isRequired,
};

export default Summary;
