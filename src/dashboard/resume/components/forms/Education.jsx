import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Education() {
    const [loading, setLoading] = useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
   const params=useParams();
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: ''

        }
    ])

    useEffect(()=>{
        resumeInfo?.education.length>0&&setEducationalList(resumeInfo?.education)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleChange = (event, index) => {
const newEntries=educationalList.slice();
const {name,value}=event.target;
newEntries[index][name]=value;
setEducationalList(newEntries);
    }


    const AddNewEducation = () => {
        setEducationalList([...educationalList,

        {

            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: ''
        }

        ])
        toast.success('Added', {
            duration: 1000,
            style: { backgroundColor: 'green', color: 'white' },
          });
    }


    const RemoveEducation = () => {
        setEducationalList(educationalList=> educationalList.slice(0, -1))
        toast.success('Removed', {
            duration: 1000,
            style: { backgroundColor: 'red', color: 'white' },
          });
    }

    const onSave = () => {
        setLoading(true)
      const data={
        data:{
            // eslint-disable-next-line no-unused-vars
            education:educationalList.map(({ id, ...rest})=>rest)
        }
      }
      GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
        console.log(resp);
        setLoading(false)
        toast.success('Details updated', {
            duration:1000,
            style: { backgroundColor: 'green', color: 'white' },
          });
      },()=>{
        setLoading(false);
        toast.error('Failed to update details', {
            duration:1000,
            style: { backgroundColor: 'red', color: 'white' },
          });
      })
    }  

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationalList
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[educationalList])
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your Educational details</p>
            <div>
                {educationalList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input name="universityName"
                                defaultValue={item?.universityName}
                                    onChange={(e) => handleChange(e, index)} />
                            </div>

                            <div>
                                <label>Degree</label>
                                <Input name="degree"
                                  defaultValue={item?.degree}
                                    onChange={(e) => handleChange(e, index)} />
                            </div>



                            <div>
                                <label>Major</label>
                                <Input name="major"
                                  defaultValue={item?.major}
                                    onChange={(e) => handleChange(e, index)} />
                            </div>



                            <div>
                                <label>Start Date</label>
                                <Input type="date" name="startDate"
                                  defaultValue={item?.startDate}
                                    onChange={(e) => handleChange(e, index)} />
                            </div>



                            <div>
                                <label>End Date</label>
                                <Input type="date" name="endDate"
                                  defaultValue={item?.endDate}
                                    onChange={(e) => handleChange(e, index)} />
                            </div>

                        </div>
                        
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Button variant="outline" onClick={AddNewEducation} className="text-primary">+ Add</Button>
                                <Button variant="outline" onClick={RemoveEducation} className="text-primary">- Remove</Button>
                            </div>


                            <Button disabled={loading} onClick={() => onSave()}>
                                {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                            </Button>
                        </div>
        </div>
    )
}

export default Education