import React, { useState } from 'react';
import api from '../utils/api';

export default function ConfessionCard({ confession, onUpdate }) {
  const { _id, content, reactions, replies = [], createdAt } = confession;
  const [loading, setLoading] = useState(false);

  const react = async (type) => {
    setLoading(true);
    try {
      const { data } = await api.patch(`/confessions/${_id}/react`, { type });
      onUpdate(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reply = async () => {
    const text = prompt('Your reply:');
    if (!text) return;
    try {
      const { data } = await api.post(`/confessions/${_id}/reply`, { content: text });
      onUpdate(data);
    } catch (err) {
      console.error(err);
    }
  };

  const report = async () => {
    try {
      await api.patch(`/confessions/${_id}/report`);
      alert('Thank you for reporting.');
      // Optionally remove or refresh this confession here
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      background: '#fff',
      padding: 24,
      marginBottom: 16,
      borderRadius: 12,
      border: '1px solid #f1f5f9',
      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    }}>
      <p style={{
        fontSize: 16,
        lineHeight: 1.6,
        color: '#1e293b',
        marginBottom: 12
      }}>
        {content}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16
      }}>
        <small style={{ color: '#64748b', fontSize: 14 }}>
          {new Date(createdAt).toLocaleString()}
        </small>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => react('like')}
          disabled={loading}
          style={buttonStyle('like', loading)}
        >
          👍 {reactions.likes}
        </button>
        <button
          onClick={() => react('dislike')}
          disabled={loading}
          style={buttonStyle('dislike', loading)}
        >
          👎 {reactions.dislikes}
        </button>
        <button onClick={reply} style={actionButton}>
          💬 Reply
        </button>
        <button onClick={report} style={reportButton}>
          🚩 Report
        </button>
      </div>

      {replies.length > 0 && (
        <div style={{
          marginTop: 16,
          borderTop: '1px solid #f1f5f9',
          paddingTop: 16
        }}>
          {replies.map((r, i) => (
            <div key={i} style={{
              marginBottom: 12,
              padding: 12,
              background: '#f8fafc',
              borderRadius: 8
            }}>
              <p style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
                {r.content}
              </p>
              <small style={{ fontSize: 12, color: '#94a3b8' }}>
                {new Date(r.timestamp).toLocaleTimeString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const buttonStyle = (type, loading) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '8px 16px',
  background: type === 'like' ? '#f0fdf4' : '#fef2f2',
  border: `1px solid ${type === 'like' ? '#bbf7d0' : '#fecaca'}`,
  borderRadius: 20,
  color: type === 'like' ? '#16a34a' : '#dc2626',
  cursor: loading ? 'not-allowed' : 'pointer',
  opacity: loading ? 0.7 : 1,
  transition: 'background 0.2s'
});

const actionButton = {
  padding: '8px 12px',
  background: '#f1f5f9',
  border: 'none',
  borderRadius: 8,
  color: '#64748b',
  cursor: 'pointer',
  transition: 'background 0.2s'
};

const reportButton = {
  padding: '8px 12px',
  background: 'transparent',
  border: 'none',
  color: '#ef4444',
  cursor: 'pointer',
  transition: 'color 0.2s'
};
