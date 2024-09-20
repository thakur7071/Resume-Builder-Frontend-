import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import  { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

function Interest() {

    const [interestList, setInterestList] = useState([{
        name: '',
    }])
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);




    useEffect(()=>{
        resumeInfo?.interest.length>0&&setInterestList(resumeInfo?.interest)
    },[])
    const handleChange = (index, name, value) => {
        const newEntries = interestList.slice();
        newEntries[index][name] = value;
        setInterestList(newEntries);

    }


    const AddNewInterest = () => {
        setInterestList([...interestList, { name: '' }]);

        toast.success('Interest added', {
            duration: 1000,
            style: { backgroundColor: 'green', color: 'white' },
        });
    };

    const RemoveInterest = () => {
        if (interestList.length === 1) {
            toast.error('At least one Interest is required.', {
                duration: 1000,
                style: { backgroundColor: 'red', color: 'white' },
            });
            return;
        }

        setInterestList(interestList.slice(0, -1));

        toast.success('Interest removed', {
            duration: 1000,
            style: { backgroundColor: 'green', color: 'white' },
        });
    };
   

    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                interest: interestList.map(({ id, ...rest})=>rest)
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                console.log(resp);
                setLoading(false);
                toast.success('Details updated', {
                    duration:1000,
                    style: { backgroundColor: 'green', color: 'white' },
                  });
            }, (error) => {
                setLoading(false)
                toast.error('Failed to update details', {
                    duration:1000,
                    style: { backgroundColor: 'red', color: 'white' },
                  });
            })
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            interest: interestList
        })
    }, [interestList])
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 animate-fadeIn'>
            <h2 className='font-bold text-lg'>Interest</h2>
            <p>Add Your Interest</p>
            <div>
                {interestList.map((item, index) => (
                    <div key={index} className='border rounded-lg p-3 mb-2 animate-fadeIn' >
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input className="w-full transition-all animate-fadeIn"
                            defaultValue={item?.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between button-container">
                <div className='flex gap-2'>
                    <Button variant="outline"
                     onClick={AddNewInterest}
                      className="text-primary button-item animate-fadeIn"
                      >+ Add </Button>
                    <Button variant="outline" 
                    onClick={RemoveInterest} 
                  className="text-primary button-item animate-fadeIn"
                    >- Remove</Button>
                </div>


                <Button disabled={loading}
                 onClick={() => onSave()}
                 className="transition-all button-item animate-fadeIn"
                 >
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Interest
