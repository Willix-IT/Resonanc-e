import React from 'react';
import styled from 'styled-components';
import TextInput from '../atoms/TextField';

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormField: React.FC<FormFieldProps> = ({ label, type, value, placeholder, onChange }) => (
  <FormGroup>
    <TextInput label={label} type={type} value={value} placeholder={placeholder} onChange={onChange} />
  </FormGroup>
);

export default FormField;
