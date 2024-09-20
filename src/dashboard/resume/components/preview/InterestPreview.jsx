import PropTypes from 'prop-types';

function InterestPreview({ resumeInfo }) {
  return (
    <div className='my-6 '>
      <h2 className='text-center font-bold text-sm mb-2'>Interest</h2>
      <hr className='my-4 border-t-[1.8px] border-t-black' />
      <div className='grid grid-cols-3 '>
        {resumeInfo?.interest.map((interest, index) => (
          <div key={index} className='flex items-center'>
            <span className='text-xl mr-2'>•</span> {/* Bullet point */}
            <h2 className='text-sm '>{interest.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

// PropTypes validation
InterestPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    interest: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    )
  })
};

export default InterestPreview;
