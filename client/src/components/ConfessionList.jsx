import { useEffect, useState } from 'react';
import api from '../utils/api';
import ConfessionCard from './ConfessionCard';

export default function ConfessionList() {
  const [list, setList] = useState([]);

  const fetchAll = async () => {
    const { data } = await api.get('/confessions');
    setList(data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleUpdate = updated => {
    setList(prev =>
      prev.map(c => c._id === updated._id ? updated : c)
    );
  };

  return (
    <>
      {list.map(c => (
        <ConfessionCard key={c._id} confession={c} onUpdate={handleUpdate}/>
      ))}
    </>
  );
}
