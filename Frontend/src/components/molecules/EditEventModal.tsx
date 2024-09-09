import React, { useState } from "react";
import styled from "styled-components";
import TextField from "../atoms/TextField"; // Utilisation de l'atom TextField
import Button from "../atoms/Button"; // Utilisation de l'atom Button

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

interface EditEventModalProps {
  event: any; // L'événement à éditer
  onClose: () => void; // Fonction appelée pour fermer la modal
  onSave: (updatedEvent: any) => void; // Fonction appelée pour sauvegarder l'événement édité
}

const formatDateForInput = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  const hours = ("0" + d.getHours()).slice(-2);
  const minutes = ("0" + d.getMinutes()).slice(-2);
  return `${year}-${month}-${day}T${hours}:${minutes}`; // Format pour l'input datetime-local
};

const EditEventModal: React.FC<EditEventModalProps> = ({
  event,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(event.title); // État pour le titre de l'événement
  const [startTime, setStartTime] = useState(
    formatDateForInput(event.startTime)
  ); // État pour l'heure de début
  const [endTime, setEndTime] = useState(formatDateForInput(event.endTime)); // État pour l'heure de fin

  const handleSave = () => {
    onSave({
      ...event,
      title,
      startTime,
      endTime,
    }); // Appelle la fonction onSave avec les nouvelles valeurs
    onClose(); // Ferme la modal
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalWrapper>
        <h2>Edit Event</h2>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          type="text"
          label="Title"
        />
        <TextField
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          type="datetime-local"
          label="StartTime"
          placeholder=""
        />
        <TextField
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          type="datetime-local"
          label="EndTime"
          placeholder=""
        />
        <Button onClick={handleSave}>Save Changes</Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalWrapper>
    </>
  );
};

export default EditEventModal;
