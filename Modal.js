import React, { useState } from 'react';

const MovieModal = ({ onClose, onSave }) => {
  const [movie, setMovie] = useState({
    name: '',
    yearOfRelease: '',
    plot: '',
    poster: '',
  });
  const [producer, setProducer] = useState({
    name: '',
    gender: '',
    dob: '',
    bio: '',
  });
  const [actors, setActors] = useState([
    {
      name: '',
      gender: '',
      dob: '',
      bio: '',
    },
  ]);

  const handleActorChange = (index, event) => {
    const { name, value } = event.target;
    const updatedActors = [...actors];
    updatedActors[index][name] = value;
    setActors(updatedActors);
  };

  const addActor = () => {
    setActors([...actors, { name: '', gender: '', dob: '', bio: '' }]);
  };

  const handleSave = () => {
    // Call onSave prop and pass movie, producer, and actors data
    onSave({ movie, producer, actors });
  };

  return (
    <div className="modal">
      {/* Movie Details Section */}
      <input type="text" name="name" value={movie.name} onChange={(e) => setMovie({ ...movie, name: e.target.value })} />
      {/* Other movie fields... */}

      {/* Producer Details Section */}
      <input type="text" name="name" value={producer.name} onChange={(e) => setProducer({ ...producer, name: e.target.value })} />
      {/* Other producer fields... */}

      {/* Actor Details Section */}
      {actors.map((actor, index) => (
        <div key={index}>
          <input type="text" name="name" value={actor.name} onChange={(e) => handleActorChange(index, e)} />
          {/* Other actor fields... */}
        </div>
      ))}
      <button onClick={addActor}>Add Actor</button>

      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default MovieModal;
