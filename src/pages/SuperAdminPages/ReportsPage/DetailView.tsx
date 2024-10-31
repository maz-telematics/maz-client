// src/components/DetailView.tsx
import React from 'react';
import { Card } from 'antd';

interface DetailViewProps {
  title: string;
  data: any;
  onClose: () => void; // Callback to close the detail view
}

const DetailView: React.FC<DetailViewProps> = ({ title, data, onClose }) => {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>{title}</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

// Styles for overlay and modal
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle: React.CSSProperties = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
};

export default DetailView;
