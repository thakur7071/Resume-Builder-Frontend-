import PropTypes from 'prop-types';

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className='p-4 sm:p-6 '>
      <h2 className='font-bold text-xl sm:text-2xl md:text-3xl text-center'>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h3 className='text-center text-lg sm:text-xl md:text-2xl font-medium'>
        {resumeInfo?.jobTitle}
      </h3>
      <p className='text-center text-xs sm:text-sm md:text-base lg:text-lg'>
        {resumeInfo?.address}
      </p>
      <div className='flex flex-col sm:flex-row sm:justify-between'>
        <h4 className='font-normal text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-0'>
          {resumeInfo?.phone}
        </h4>
        <h4 className='font-normal text-xs sm:text-sm md:text-base lg:text-lg'>
          {resumeInfo?.github ? (
            <a
              href={resumeInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className='text-blue-500 hover:underline'
            >
              {resumeInfo.github}
            </a>
          ) : (
            'N/A'
          )}
        </h4>
      </div>
      <div className='flex flex-col sm:flex-row sm:justify-between'>
        <h4 className='font-normal text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-0'>
          {resumeInfo?.email ? (
            <a
              href={`mailto:${resumeInfo.email}`}
              className='text-blue-500 hover:underline'
            >
              {resumeInfo.email}
            </a>
          ) : (
            'N/A'
          )}
        </h4>
        <h4 className='font-normal text-xs sm:text-sm md:text-base lg:text-lg'>
          {resumeInfo?.linkdin ? (
            <a
              href={resumeInfo.linkdin}
              target="_blank"
              rel="noopener noreferrer"
              className='text-blue-500 hover:underline'
            >
              {resumeInfo.linkdin}
            </a>
          ) : (
            'N/A'
          )}
        </h4>
      </div>
      <hr className='my-4 border-t-[1.8px] border-t-black' />
    </div>
  );
}

// PropTypes validation
PersonalDetailPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    jobTitle: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    github: PropTypes.string,
    linkdin: PropTypes.string,
  }),
};

export default PersonalDetailPreview;
