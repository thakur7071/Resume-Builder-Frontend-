import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import InterestPreview from './preview/InterestPreview'
import CertificatePreview from './preview/CertificatePreview'
import ProjectPreview from './preview/ProjectPreview'


function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-5 border-t-[5px] border-t-black'>
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />



      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />


      {/* Education */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Projects */}
      <ProjectPreview resumeInfo={resumeInfo} />






      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />


      {/* Certificate */}
      <CertificatePreview resumeInfo={resumeInfo} />


      {/* Interest */}
      <InterestPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview
