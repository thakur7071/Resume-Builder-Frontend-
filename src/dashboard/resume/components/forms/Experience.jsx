import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';



const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',

}

function Experience() {
    const [loading, setLoading] = useState(false);
    const [experienceList, setExperienceList] = useState([
        {
        formField
    }
    ]);




    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params=useParams();




    useEffect(()=>{
        resumeInfo?.experience.length>0&&setExperienceList(resumeInfo?.experience)
        
   
    
    },[])




    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: '',
        }]);
        toast.success('Added', {
            duration: 1000,
            style: { backgroundColor: 'green', color: 'white' },
          });
    }
    

    // const RemoveExperience = () => {
    //     setExperienceList(experienceList => experienceList.slice(0, -1))
    //     toast.success('Removed', {
    //         duration: 1000,
    //         style: { backgroundColor: 'green', color: 'white' },
    //       });
    // }

    const RemoveExperience = () => {
        if (experienceList.length === 1) {
            toast.error('At least one Experience is required.', {
                duration: 1000,
                style: { backgroundColor: 'red', color: 'white' },
            });
            return;
        }
    
        setExperienceList(experienceList.slice(0, -1));
    
        toast.success('Experience removed', {
            duration: 1000,
            style: { backgroundColor: 'green', color: 'white' },
        });
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })
 
   
    },[experienceList]);


    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
               
                experience:experienceList.map(({ id, ...rest})=>rest)
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res);
            setLoading(false);
            toast.success('Details updated', {
                duration:1000,
                style: { backgroundColor: 'green', color: 'white' },
              });
        }, (error) => {
            setLoading(false);
            toast.error('Failed to update details', {
                duration:1000,
                style: { backgroundColor: 'red', color: 'white' },
              });
        })

    }





    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 animate-fadeIn'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>

                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg animate-fadeIn'>

                                <div>

                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title"
                                       className=" transition-all animate-fadeIn"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.title} />

                                </div>

                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName"
                                       className=" transition-all animate-fadeIn"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.companyName} />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city"
                                    className=" transition-all animate-fadeIn"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.city} />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state"
                                    className=" transition-all animate-fadeIn"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.state}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input
                                    className=" transition-all animate-fadeIn"
                                        type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                    className=" transition-all animate-fadeIn"
                                        type="date"
                                        name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div>
                               

                                <div className='col-span-2
                                transition-all animate-fadeIn'
                                >

                                    <RichTextEditor
                                     defaultValue={item?.workSummary}
                                    
                                        index={index}
                                        onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)} />
                                </div>

                            </div>

                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" 
                        onClick={AddNewExperience}
                            className="text-primary button-item animate-fadeIn"
                         >+ Add</Button>
                        <Button variant="outline"
                         onClick={RemoveExperience} 
                           className="text-primary button-item animate-fadeIn"
                         >- Remove</Button>
                    </div>


                    <Button disabled={loading} onClick={() => onSave()}
                          className="transition-all button-item animate-fadeIn"
                        >
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Experience
