import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phonebook, setPhonebook] = useState([]);
  const [newPhone, setNewPhone] = useState(0);

  const addNewNumber = () => {
    Axios.post('http://localhost:5000/add-phone', { name, phone })
      .then(response => {
        console.log('Phone number added successfully:', response.data);
        // Clear the input fields after successful addition
        setName('');
        setPhone('');
        // Fetch updated phonebook data
        fetchPhonebook();
      })
      .catch(error => {
        console.error('Error adding phone number:', error);
      });
  };

  const fetchPhonebook = () => {
    Axios.get('http://localhost:5000/get-phone')
      .then(res => {
        setPhonebook(res.data.data.phoneNumbers);
      })
      .catch(error => {
        console.error('Error fetching phonebook:', error);
      });
  };

  const updatePhone = (id) => {
    Axios.put('http://localhost:5000/update-phone', { id, newPhone })
      .then(response => {
        console.log('Phone number updated successfully:', response.data);
        // Fetch updated phonebook data
        fetchPhonebook();
      })
      .catch(error => {
        console.error('Error updating phone number:', error);
      });
  };

  const deletePhone = (id) => {
    Axios.delete(`http://localhost:5000/delete-phone/${id}`)
      .then(response => {
        console.log('Phone number deleted successfully:', response.data);
        // Fetch updated phonebook data
        fetchPhonebook();
      })
      .catch(error => {
        console.error('Error deleting phone number:', error);
      });
  };

  useEffect(() => {
    fetchPhonebook();
  }, []);

  return (
    <div className="container">
      <div className="add-number">
        <h1>Add New Number</h1>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
        <label htmlFor="phone">Phone: </label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br />
        <button onClick={addNewNumber}>Add New Number</button>
      </div>

      <div className="phonebook-list">
        <h1>PhoneBook List</h1>
        {phonebook.map((val, key) => (
          <div key={key} className="phone">
            <h2>{val.name}</h2>
            <h2>{val.phone}</h2>
            <input type="number" placeholder='update Phone...' onChange={(e) => setNewPhone(e.target.value)} />
            <button className="update-btn" onClick={() => updatePhone(val._id)}>Update</button>
            <button className="delete-btn" onClick={() => deletePhone(val._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;