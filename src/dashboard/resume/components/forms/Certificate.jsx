import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useContext, useEffect, useState } from 'react'
import GlobalApi from './../.././../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';




function Certificate() {
  const [certificateList, setCertificateList] = useState([{
    name: '',
  }])
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);




  useEffect(() => {
    resumeInfo?.certificate.length > 0 && setCertificateList(resumeInfo?.certificate)
  }, [])

  const handleChange = (index, name, value) => {
    const newEntries = certificateList.slice();
    newEntries[index][name] = value;
    setCertificateList(newEntries);

  }



  const AddNewCertificate = () => {
    setCertificateList([...certificateList, { name: '' }]);

    toast.success('Certificate added', {
        duration: 1000,
        style: { backgroundColor: 'green', color: 'white' },
    });
};

const RemoveCertificate = () => {
    if (certificateList.length === 1) {
        toast.error('At least one certificate is required.', {
            duration: 1000,
            style: { backgroundColor: 'red', color: 'white' },
        });
        return;
    }

    setCertificateList(certificateList.slice(0, -1));

    toast.success('Certificate removed', {
        duration: 1000,
        style: { backgroundColor: 'green', color: 'white' },
    });
};

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        certificate: certificateList.map(({ id, ...rest }) => rest)
      }
    }
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then(resp => {
        console.log(resp);
        setLoading(false);
        toast.success('Details updated', {
          duration: 1000,
          style: { backgroundColor: 'green', color: 'white' },
        });

      }, (error) => {
        setLoading(false)
        toast.error('Failed to update details', {
          duration: 1000,
          style: { backgroundColor: 'red', color: 'white' },
        });
      })
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      certificate: certificateList
    })
  }, [certificateList])
  return (
    <div className="skills-page p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 animate-fadeIn">
      <h2 className='font-bold text-lg'>Certificates</h2>
      <p>Add Your Certificates</p>
      <div>
        {certificateList.map((item, index) => (
          <div key={index} 
          className="border rounded-lg p-3 mb-2  animate-fadeIn"
          >
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
           onClick={AddNewCertificate} 
          className="text-primary button-item animate-fadeIn"
           >
            + Add</Button>
          <Button variant="outline"
           onClick={RemoveCertificate} 
          className="text-primary button-item animate-fadeIn"
           >
            - Remove</Button>
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

export default Certificate




