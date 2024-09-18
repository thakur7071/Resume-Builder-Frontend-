import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import  { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';

const initialFormField = {
    title: '',
    startDate: '',
    endDate: '',
    projectSummary: '',
};

function Project() {
    const [loading, setLoading] = useState(false);
    const [projectList, setProjectList] = useState([initialFormField]);

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();

    // Update projectList when resumeInfo changes
    useEffect(() => {
        if (resumeInfo?.project?.length > 0) {
            setProjectList(resumeInfo.project);
        }
    }, []);

    // Handle input changes
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = projectList.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setProjectList(newEntries);
    };

    // const RemoveProject = () => {
     
    //         setProjectList(projectList.slice(0, -1));
        
    //     toast.success('Removed', {
    //         duration: 1000,
    //         style: { backgroundColor: 'green', color: 'white' },
    //       });
    // };


    const AddNewProject = () => {
        setProjectList([...projectList, { ...initialFormField }]);

        toast.success('Project added', {
            duration: 1000,
            style: { backgroundColor: 'green', color: 'white' },
        });
    };

    const RemoveProject = () => {
        if (projectList.length === 1) {
            toast.error('At least one Project is required.', {
                duration: 1000,
                style: { backgroundColor: 'red', color: 'white' },
            });
            return;
        }

        setProjectList(projectList.slice(0, -1));

        toast.success('project removed', {
            duration: 1000,
            style: { backgroundColor: 'green', color: 'white' },
        });
    };

    // Update resumeInfo with the current projectList
    useEffect(() => {
        setResumeInfo(prevResumeInfo => ({
            ...prevResumeInfo,
            project: projectList,
        }));
    }, [projectList]);

    // Save function with async/await and error handling
    const onSave = async () => {
        setLoading(true);
        try {
            const data = {
                data: {
                    // eslint-disable-next-line no-unused-vars
                    project: projectList.map(({ id, ...rest }) => rest),
                },
            };
    
            await GlobalApi.UpdateResumeDetail(params.resumeId, data);
            toast.success('Details updated', {
                duration:1000,
                style: { backgroundColor: 'green', color: 'white' },
              });
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error('Failed to update details', {
                duration:1000,
                style: { backgroundColor: 'red', color: 'white' },
              });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10  animate-fadeIn'>
                <h2 className='font-bold text-lg'>Projects</h2>
                <p>Add Your Projects</p>
                <div>
                    {projectList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg animate-fadeIn'>
                                <div className='col-span-2'>
                                    <label className='text-xs'>Project Title</label>
                                    <Input
                                     className="animate-fadeIn"
                                        name="title"
                                        value={item.title || ''}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input
                                     className="animate-fadeIn"
                                        type="date"
                                        name="startDate"
                                        value={item.startDate || ''}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                    className="animate-fadeIn"
                                        type="date"
                                        name="endDate"
                                        value={item.endDate || ''}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </div>
                                <Textarea
                                    className="col-span-2 animate-fadeIn"
                                    name="projectSummary"
                                    value={item.projectSummary || ''}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between button-container">
                    <div className='flex gap-2'>
                        <Button variant="outline" 
                        onClick={AddNewProject}
                      className="text-primary button-item animate-fadeIn"
                         >+ Add</Button>
                        <Button variant="outline"
                         onClick={RemoveProject} 
                         className="text-primary button-item animate-fadeIn"
                         >- Remove</Button>
                    </div>
                    <Button disabled={loading}
                     onClick={onSave}
                       className="transition-all button-item animate-fadeIn"
                     >
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Project;
