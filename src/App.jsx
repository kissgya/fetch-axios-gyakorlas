import { useState, useEffect } from 'react';
import './App.css';

const ListaKomponens = ({ elem }) => {
  return (
    <div className="container">
      <div className="row m-5 p-5">
        <strong>{elem.name}</strong> - {elem.email}<br />
        {elem.body}
      </div>
    </div>
  );
};

export const App = () => {
  const [adat, setAdat] = useState({});
  const [hiba, setHiba] = useState('');
  const [id] = useState(500);

  useEffect(() => {
    // Fetch API hívás .then() / .catch() láncolattal
    fetch(`https://harmadik.sulla.hu/Comment/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP hiba! Státusz: ${res.status}`);
        }
        return res.json(); // A válasz konvertálása JSON objektummá
      })
      .then((data) => setAdat(data))
      .catch((error) => setHiba(error.message));
  }, [id]);

  return (
    <div className="container">
      <div className="row m-5 p-5 border">
        {hiba ? <p className="text-danger">{hiba}</p> : <ListaKomponens elem={adat} />}
      </div>
    </div>
  );
};

export default App;