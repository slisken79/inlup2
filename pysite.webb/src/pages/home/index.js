import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState(null);
  const [newUser, setNewUser] = useState({ name: '' });
  const [updatedNames, setUpdatedNames] = useState({});
  // Below function performs the POST operation when called
  const addUser = () => {
    fetch('http://127.0.0.1:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          // Here we call fetchdata to retrieve the updated data!

          fetchData();
        } else {
          console.log('Error updating users');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Below function performs the GET operation when called 
  const fetchData = () => {
    fetch('http://127.0.0.1:5000/api/users', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching data');
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const updateUser = (userId) => {
    fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedNames[userId] }), // Use the updatedName for the specific user
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Fetch data again to reflect the changes
        } else {
          console.log('Error updating the user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteUser = (userId) => {
    fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Fetch data again to reflect the changes
        } else {
          console.log('Error deleting the user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <div className="post-container">
      <marquee className="marq" bgcolor = "black" direction = "left" loop="" >
        <div className="namn">Youness Essadak</div>
        <div className="kurs">REST-API Projektet</div>
      </marquee>
        <h2>Skriv ett namn:</h2>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Namn"
        />
        <button onClick={addUser}>Lägg till</button>
      </div>
      <div className="put-delete-container">
        {data ? (
          <ul className="user-list">
            <h2>Här är lista av namnen:</h2>
            <p>Här kan du uppdatera namnen eller ta bort dem.</p>
            {Object.keys(data.users).map((userId) => (
              <li key={userId} className="user-item">
                <div className="user-info">
                  <p>ID: {userId}</p>
                  <p>Namn: {data.users[userId].name}</p>
                </div>
                <input
                  type="text"
                  value={updatedNames[userId] || ''}
                  onChange={(e) =>
                    setUpdatedNames({
                      ...updatedNames,
                      [userId]: e.target.value,
                    })
                  }
                  placeholder="Namn"
                />
                <button className='updatebutton' onClick={() => updateUser(userId)}>Uppdatera</button>
                <button className='deletebutton' onClick={() => deleteUser(userId)}>Ta bort</button>
              </li>
            ))}
          </ul>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default Home;
