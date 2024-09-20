import PropTypes from 'prop-types';

function ProjectPreview({ resumeInfo }) {
    return (
        <div className='my-6 '>
            <h2 className='text-center font-bold text-sm mb-2'>Projects</h2>
            <hr className=' my-4 border-t-[1.8px] border-t-black' />
            {resumeInfo?.project.map((project, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold flex justify-between'>{project?.title}
                        <span className='text-sm font-normal'>{project?.startDate} - {project?.endDate}</span>
                    </h2>

                    <h2 className='text-sm flex justify-between'>{project?.projectSummary}
                    </h2>
                </div>
            ))}
        </div>
    );
}

// Define PropTypes for the component
ProjectPreview.propTypes = {
    resumeInfo: PropTypes.shape({
        project: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                startDate: PropTypes.string.isRequired,
                endDate: PropTypes.string.isRequired,
                projectSummary: PropTypes.string.isRequired,
            })
        ).isRequired,
    }),
};

export default ProjectPreview;
