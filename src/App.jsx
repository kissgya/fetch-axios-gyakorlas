import { useState, useEffect } from 'react';
import './App.css';

const ListaKomponens = ({ elem }) => {
  return (
    <div className="container">
      <div className="row m-3 p-3 border">
        <strong>{elem.name}</strong> ({elem.email})<br />
        {elem.body}
      </div>
    </div>
  );
};

export const App = () => {
  const [adatok, setAdatok] = useState([]);
  const [hiba, setHiba] = useState('');

  useEffect(() => {
    const kommentekBetoltese = async () => {
      try {
        const response = await fetch('https://harmadik.sulla.hu/Comment');
        if (!response.ok) {
          throw new Error(`HTTP hiba: ${response.status}`);
        }
        const data = await response.json();
        setAdatok(data);
      } catch (error) {
        setHiba(error.message);
      }
    };

    kommentekBetoltese();
  }, []);

  return (
    <div className="container">
      {hiba && <p className="text-danger">{hiba}</p>}
      {adatok.map((item) => (
        <ListaKomponens key={item.id} elem={item} />
      ))}
    </div>
  );
};

export default App;