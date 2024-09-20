import PropTypes from 'prop-types';

function SummaryPreview({ resumeInfo }) {
  return (
    <p className='text-sm '>{resumeInfo?.summary}</p>
  );
}

// PropTypes validation
SummaryPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    summary: PropTypes.string,  // Specify the type of summary
  }),
};

export default SummaryPreview;
