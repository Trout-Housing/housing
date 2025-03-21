import React, { useState, useEffect} from 'react';
import db from './DatabaseManager';  // Importing the Database class


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import './App.css';


interface Apartment {
  id: number;
  name: string;
  price: string;
  complex: string;
}

function HomePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  // Fetch apartments on component mount
  useEffect(() => {
    setApartments(db.getInfo('')); // Get all apartments, or you can filter by name here
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Trout</h1>
      </header>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search apartments..."
          className="search-bar"
        />
      </div>
      <div className="apartment-list">
        {apartments.map((apartment) => (
          <Link to={`/apartment/${apartment.id}`} key={apartment.id} className="apartment-card">
            <h2>{apartment.name}</h2>
            <p>Price: {apartment.price} / month</p>
            <p>Complex: {apartment.complex}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ApartmentDetails() {
  const { id } = useParams<{ id: string }>(); // Correctly typing useParams
  const apartment = db.getApartmentById(Number(id));

  if (!apartment) {
    return (
      <div className="app-container">
        <h1>Apartment not found</h1>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{apartment.name}</h1>
      </header>
      <div className="details-content">
        <div className="prices-list">
          <ul>
            <li>Price1: {apartment.price}</li>
            <li>Price2: {apartment.price}</li>
            <li>Price3: {apartment.price}</li>
          </ul>
        </div>
        <div className="dummy-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          </p>
          <img src="https://via.placeholder.com/300" alt="Placeholder" className="placeholder-image" />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apartment/:id" element={<ApartmentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
