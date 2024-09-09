import React from 'react';
import styled from 'styled-components';
import TextInput from '../atoms/TextField';  // Import du champ de texte TextField

interface FormFieldProps {
  label: string;  // Le label du champ de saisie
  type: string;  // Le type du champ de saisie (text, email, password, etc.)
  value: string;  // La valeur actuelle du champ de saisie
  placeholder: string;  // Le texte indicatif à afficher lorsqu'il est vide
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Fonction déclenchée lors du changement de valeur
}

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormField: React.FC<FormFieldProps> = ({ label, type, value, placeholder, onChange }) => (
  <FormGroup>
    <TextInput 
      label={label} 
      type={type} 
      value={value} 
      placeholder={placeholder} 
      onChange={onChange}  // Passe la fonction de gestion de changement au TextInput
    />
  </FormGroup>
);

export default FormField;
