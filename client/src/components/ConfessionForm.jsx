import { useState } from 'react';
import api from '../utils/api';

export default function ConfessionForm({ onPost }) {
  const [content, setContent] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!content.trim()) return;
    const { data } = await api.post('/confessions', { content });
    setContent('');
    onPost(data);
  };
  return (
    <form onSubmit={submit} style={{ 
      marginBottom: 32,
      background: '#f8fafc',
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <textarea
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your confession anonymously..."
        style={{
          width: '100%',
          padding: 16,
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          fontSize: 16,
          lineHeight: 1.5,
          resize: 'vertical',
          minHeight: 120,
          outline: 'none',
          transition: 'all 0.2s',
          ':focus': {
            borderColor: '#6366f1',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
          }
        }}
      />
      <button 
        type="submit" 
        style={{ 
          marginTop: 16,
          background: '#6366f1',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 8,
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
          ':hover': {
            background: '#4f46e5'
          },
          ':disabled': {
            background: '#cbd5e1',
            cursor: 'not-allowed'
          }
        }}
      >
        Post Confession
      </button>
    </form>
  );
}