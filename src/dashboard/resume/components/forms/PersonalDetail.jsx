import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
  }, [params]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then((resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast.success('Details updated', {
          duration: 1000,
          style: { backgroundColor: 'green', color: 'white' },
        });
      })
      .catch((error) => {
        console.error(error); // Log the error
        setLoading(false);
        toast.error('Failed to update details', {
          duration: 1000,
          style: { backgroundColor: 'red', color: 'white' },
        });
      });
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 animate-fadeIn'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3 animate-fadeIn'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input name="firstName"
             className="transition-all animate-fadeIn"
            defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>

          <div>
            <label className='text-sm'>Last Name</label>
            <Input name="lastName"
             className="transition-all animate-fadeIn"
            defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
          </div>

          <div className='col-span-2'>
            <label className='text-sm'>JobTitle</label>
            <Input name="jobTitle"
             className="transition-all animate-fadeIn"
            defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
          </div>

          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input name="address"
             className="transition-all animate-fadeIn"
            defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
          </div>

          <div>
            <label className='text-sm'>Phone</label>
            <Input name="phone"
             className="transition-all animate-fadeIn"
            defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
          </div>

          <div>
            <label className='text-sm'>Email</label>
            <Input name="email" 
             className="transition-all animate-fadeIn"
            defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
          </div>

          <div>
            <label className='text-sm'>Github</label>
            <Input name="github" 
             className="transition-all animate-fadeIn"
            defaultValue={resumeInfo?.github} required onChange={handleInputChange} />
          </div>

          <div>
            <label className='text-sm'>LinkedIn</label>
            <Input name="linkdin" 
             className="transition-all animate-fadeIn"
            defaultValue={resumeInfo?.linkdin} required onChange={handleInputChange} />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit" disabled={loading}
           className="transition-all button-item animate-fadeIn"
          >
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

// PropTypes validation
PersonalDetail.propTypes = {
  enabledNext: PropTypes.func.isRequired,
};

export default PersonalDetail;
