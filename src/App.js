import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './routes/dashboard/Dashboard';
import Authentication from './routes/auth/Authentication';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setIsLoggedIn(true);
            setUserUsername(data.username);
          } else {
            setIsLoggedIn(false);
            setUserUsername('');
          }
        })
        .catch(error => {
          console.error('Error during authentication:', error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
      )}
    </div>
  );
};


export default App;
