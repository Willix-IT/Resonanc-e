import styled from 'styled-components';

interface TextInputProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 4px;
`;

const TextInput: React.FC<TextInputProps> = ({ label, type, value, placeholder, onChange }) => (
  <div>
    <Label>{label}</Label>
    <Input type={type} value={value} placeholder={placeholder} onChange={onChange} />
  </div>
);

export default TextInput;
