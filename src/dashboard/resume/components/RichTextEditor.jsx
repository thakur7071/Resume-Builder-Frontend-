import PropTypes from 'prop-types'; // Import PropTypes
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index]?.title) {
      toast.error('Please Add Position Title');
      setLoading(false);
      return;
    }

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const textResult = await result.response.text(); 
      if (typeof textResult === 'string') {
        const cleanResult = textResult.replace('[', '').replace(']', '');
        setValue(cleanResult);
        onRichTextEditorChange(cleanResult);
      } else {
        console.error('Expected a string but got:', typeof textResult);
        toast.error('Failed to process AI response');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.success('Summary Generated'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <>
              <Brain className='h-4 w-4' /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e); // Ensure this is passing the updated content
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

// Define prop types
RichTextEditor.propTypes = {
  onRichTextEditorChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  defaultValue: PropTypes.string
};

export default RichTextEditor;
