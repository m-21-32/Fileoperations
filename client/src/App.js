import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CounterApp from './CounterApp';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRefresh = () => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleAddExercise = () => {
    setShowAdd(!showAdd);
  };

  const handleEditExercise = () => {
    
  };

  const handleDeleteExercise = () => {
  
  };

  const renderAddSection = () => {
    if (showAdd) {
      return (
        <div>
          <p>Form for adding exercises goes here</p>
          {/* Use CounterApp component */}
          <CounterApp />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <button onClick={handleAddExercise}>Add Exercise</button>
      <button onClick={handleEditExercise}>Edit Exercise</button>
      <button onClick={handleDeleteExercise}>Delete Exercise</button>

      {renderAddSection()}
    </div>
  );
};

export default App;
