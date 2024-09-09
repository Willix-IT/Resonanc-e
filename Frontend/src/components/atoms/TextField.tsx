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
  color: white;  /* Texte blanc pour être lisible sur fond sombre */
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  width: 100%;
  border: 1px solid #ccc;  /* Bordure douce */
  border-radius: 4px;
  background-color: #ecf0f1;  /* Fond clair pour contraste */
  color: #2c3e50;
`;

const TextField: React.FC<TextInputProps> = ({ label, type, value, placeholder, onChange }) => (
  <div>
    <Label>{label}</Label>
    <Input type={type} value={value} placeholder={placeholder} onChange={onChange} />
  </div>
);

export default TextField;
