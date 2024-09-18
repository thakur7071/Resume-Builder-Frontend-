import PropTypes from 'prop-types';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'>Skills</h2>
      <hr className='my-4 border-t-[1.8px] border-t-black' />
      <div className='grid grid-cols-3 gap-3 my-4'>
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className='skill-item'>
            <h2 className='text-sm flex justify-center'>
              <span className='bullet'>•</span> {/* Bullet character */}
              {skill.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

// Define PropTypes for the SkillsPreview component
SkillsPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  })
};

export default SkillsPreview;
