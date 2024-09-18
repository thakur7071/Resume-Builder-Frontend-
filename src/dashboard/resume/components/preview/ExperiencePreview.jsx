import React from 'react'

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'>Professional Experience</h2>
      <hr className=' my-4 border-t-[1.8px] border-t-black' />
      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'>{experience?.title}</h2>
          <h2 className='text-sm flex justify-between'>{experience?.companyName},
            {experience?.city},
            {experience?.state}
            <span>{experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience.endDate}</span>
          </h2>
          {/* <p className='text-xs my-2'>{experience?.workSummary}</p> */}
          <div className='text-sm' dangerouslySetInnerHTML={{ __html: experience?.workSummary }} />
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview