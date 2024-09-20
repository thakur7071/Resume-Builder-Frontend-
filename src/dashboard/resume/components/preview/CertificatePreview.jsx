import PropTypes from 'prop-types';

function CertificatePreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'>Certification</h2>
      <hr className='my-4 border-t-[1.8px] border-t-black' />
      <ul className='list-disc pl-5'>
        {resumeInfo?.certificate.map((certificate, index) => (
          <li key={index} className='text-sm my-2'>
            {certificate.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Define prop types
CertificatePreview.propTypes = {
  resumeInfo: PropTypes.shape({
    certificate: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    )
  })
};

export default CertificatePreview;
