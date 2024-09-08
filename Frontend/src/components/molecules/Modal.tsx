import React, { useState } from 'react';
import styled from 'styled-components';

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

const Modal: React.FC<{ onClose: () => void, onSubmit: (eventData: any) => void, timeSlot: any }> = ({ onClose, onSubmit, timeSlot }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(timeSlot.startTime);
  const [endTime, setEndTime] = useState(timeSlot.endTime);

  const handleSubmit = () => {
    onSubmit({ title, startTime, endTime });
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalWrapper>
        <h2>Create Event</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" />
        <input value={startTime} onChange={(e) => setStartTime(e.target.value)} type="datetime-local" />
        <input value={endTime} onChange={(e) => setEndTime(e.target.value)} type="datetime-local" />
        <button onClick={handleSubmit}>Create</button>
      </ModalWrapper>
    </>
  );
};

export default Modal;
