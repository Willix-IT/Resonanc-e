import React from 'react';
import styled from 'styled-components';

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

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default FormField;
