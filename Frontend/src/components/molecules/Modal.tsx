import React, { useState } from "react";
import styled from "styled-components";
import TextField from "../atoms/TextField";
import Button from "../atoms/Button";

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

const Modal: React.FC<{
  onClose: () => void;
  onSubmit: (eventData: any) => void;
  timeSlot: any;
}> = ({ onClose, onSubmit, timeSlot }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(timeSlot?.startTime || ""); // Ajoute une valeur par défaut vide
  const [endTime, setEndTime] = useState(timeSlot?.endTime || ""); // Ajoute une valeur par défaut vide

  const handleSubmit = () => {
    const eventStartTime = new Date(startTime);
    const eventEndTime = new Date(endTime);
    // Vérification du format Date correct
    if (!isNaN(eventStartTime.getTime()) && !isNaN(eventEndTime.getTime())) {
      onSubmit({
        title,
        startTime: eventStartTime.toISOString(), // Conversion en ISO string
        endTime: eventEndTime.toISOString(), // Conversion en ISO string
      });
    } else {
      console.error("Invalid Date");
    }
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalWrapper>
        <h2>Create Event</h2>
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
        <Button onClick={handleSubmit}>Save</Button>
      </ModalWrapper>
    </>
  );
};

export default Modal;
