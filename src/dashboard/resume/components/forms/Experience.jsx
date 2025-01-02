import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';

function Experience() {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [experienceList, setExperienceList] = useState([{
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: ''
    }]);

    useEffect(() => {
        resumeInfo?.experience.length > 0 && setExperienceList(resumeInfo?.experience);
    }, []);
    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const updatedExperience = [...experienceList];
        updatedExperience[index][name] = value;
        setExperienceList(updatedExperience);
    };

    const AddNewExperience = () => {
        setExperienceList([
            ...experienceList,
            { title: '', companyName: '', city: '', state: '', startDate: '', endDate: '' }
        ]);
        toast.success('Added', { duration: 1000, style: { backgroundColor: 'green', color: 'white' } });
    };

    const RemoveExperience = () => {
        if (experienceList.length === 1) {
            toast.error('At least one Experience is required.', { duration: 1000, style: { backgroundColor: 'red', color: 'white' } });
            return;
        }
        setExperienceList(experienceList.slice(0, -1));
        toast.success('Experience removed', { duration: 1000, style: { backgroundColor: 'green', color: 'white' } });
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                experience: experienceList.map(({ id, ...rest }) => rest)
            }
        };
        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(() => {
            setLoading(false);
            toast.success('Details updated', { duration: 1000, style: { backgroundColor: 'green', color: 'white' } });
        }).catch(() => {
            setLoading(false);
            toast.error('Failed to update details', { duration: 1000, style: { backgroundColor: 'red', color: 'white' } });
        });
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        });
    }, [experienceList]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 animate-fadeIn'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous experience</p>
            <div>
                {experienceList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg animate-fadeIn'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" className="transition-all animate-fadeIn" defaultValue={item.title} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" className="transition-all animate-fadeIn" defaultValue={item.companyName} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" className="transition-all animate-fadeIn" defaultValue={item.city} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" className="transition-all animate-fadeIn" defaultValue={item.state} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date" name="startDate" className="transition-all animate-fadeIn" defaultValue={item.startDate} onChange={(e) => handleChange(e, index)} />
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" className="transition-all animate-fadeIn" defaultValue={item.endDate} onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewExperience} className="text-primary button-item animate-fadeIn">+ Add</Button>
                    <Button variant="outline" onClick={RemoveExperience} className="text-primary button-item animate-fadeIn">- Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave} className="transition-all button-item animate-fadeIn">
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Experience;
