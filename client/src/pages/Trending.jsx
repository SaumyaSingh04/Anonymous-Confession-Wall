import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ConfessionCard from '../components/ConfessionCard';

export default function Trending() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get('/confessions/trending')
       .then(r => setList(r.data))
       .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🔥 Trending Confessions (Last 24h)</h1>
      {list.length === 0 ? (
        <p style={styles.empty}>No trending confessions yet. Be the first to post!</p>
      ) : (
        list.map(c => (
           <ConfessionCard
            key={c._id}
            confession={c}
            onUpdate={() => {
              api
                .get("/confessions/trending")
                .then((r) => setList(r.data))
                .catch((err) => console.error(err));
            }}
          />
        ))
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 600,
    margin: '40px auto',
    padding: '0 16px',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    fontStyle: 'italic',
    marginTop: 32,
  }
};
