import PropTypes from 'prop-types';

function EducationalPreview({ resumeInfo }) {
  return (
    <div className='my-6 '>
      <h2 className='text-center font-bold text-sm mb-2'>Education</h2>
      <hr className='my-4 border-t-[1.8px] border-t-black' />
      {resumeInfo?.education.map((education, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'>{education?.universityName}</h2>
          <h2 className='text-sm flex justify-between'>
            {education?.degree} in {education?.major}
            <span>{education?.startDate} - {education?.endDate}</span>
          </h2>
        </div>
      ))}
    </div>
  );
}

// Define PropTypes
EducationalPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    education: PropTypes.arrayOf(
      PropTypes.shape({
        universityName: PropTypes.string,
        degree: PropTypes.string,
        major: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
      })
    )
  }),
};

export default EducationalPreview;
