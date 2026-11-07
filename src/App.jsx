import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const PostKomponens = ({ elem }) => {
  return (
    <div className="container">
      <div className="row m-3 p-3 border">
        <h5>{elem.title}</h5>
        <p>{elem.body}</p>
        <small className="text-muted">Szerző ID: {elem.userId} | Post ID: {elem.id}</small>
      </div>
    </div>
  );
};

export const App = () => {
  const [posztok, setPosztok] = useState([]);
  const [hiba, setHiba] = useState('');

  useEffect(() => {
    const posztokBetoltese = async () => {
      try {
        const response = await axios.get('https://harmadik.sulla.hu/Post');
        setPosztok(response.data);
      } catch (error) {
        setHiba(error.message);
      }
    };

    posztokBetoltese();
  }, []);

  return (
    <div className="container">
      {hiba && <p className="text-danger">{hiba}</p>}
      {posztok.map((item) => (
        <PostKomponens key={item.id} elem={item} />
      ))}
    </div>
  );
};

export default App;