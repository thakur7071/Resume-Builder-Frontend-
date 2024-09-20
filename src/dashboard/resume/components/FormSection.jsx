import { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import Certificate from './forms/Certificate';
import Interest from './forms/Interest';
import Project from './forms/Project';
import { Link, Navigate, useParams } from 'react-router-dom';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false)
  const { resumeId } = useParams();
  return (
    <div >
      <div className='flex justify-between items-center '>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
            <Button><Home /></Button>
          </Link>

        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1
            && <Button size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            ><ArrowLeft /></Button>}
          <Button
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            <ArrowRight /></Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex == 1 ?
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
        : activeFormIndex == 2 ?
          <Summary enabledNext={(v) => setEnableNext(v)} />
          : activeFormIndex == 3 ?
            <Education enabledNext={(v) => setEnableNext(v)}/>
            : activeFormIndex == 4 ?
              <Experience enabledNext={(v) => setEnableNext(v)} />
              : activeFormIndex == 5 ?
                <Project />
                : activeFormIndex == 6 ?
                  <Skills />
                  : activeFormIndex == 7 ?
                    <Certificate />
                    : activeFormIndex == 8 ?
                      <Interest />
                      : activeFormIndex == 9 ?
                        <Navigate to={'/my-resume/' + resumeId + "/view"} />
                        : null
      }



      {/* Experience */}




      {/* Educational Detail */}




      {/* Skills */}
    </div>
  )
}

export default FormSection
