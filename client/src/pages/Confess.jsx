import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConfessionForm from '../components/ConfessionForm';
import API from '../utils/api';

export default function Confess() {
  const navigate = useNavigate();

  const handleSubmit = async (content) => {
    try {
      await API.post('/confessions', { content });
      navigate('/');
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📢 Share Your Confession</h2>
      <div style={styles.formContainer}>
        <ConfessionForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 600,
    margin: '40px auto',
    padding: '0 16px',
    background: '#B3B3B3',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    margin: '24px 0',
  },
  formContainer: {
    padding: 16,
    borderTop: '1px solid #e2e8f0',
  }
};
