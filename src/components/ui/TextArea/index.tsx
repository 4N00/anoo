import { forwardRef } from 'react';
import { TextAreaContainer, StyledTextArea, Label, ErrorMessage } from './styles';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <TextAreaContainer>
        {label && <Label>{label}</Label>}
        <StyledTextArea ref={ref} $hasError={!!error} {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </TextAreaContainer>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
export type { TextAreaProps }; 