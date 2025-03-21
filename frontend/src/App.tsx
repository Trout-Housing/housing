import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import './App.css';

const apartments = [
  { id: 1, name: 'Sunset Loft', price: '$1200', complex: 'The Modern Nest' },
  { id: 2, name: 'Urban Oasis', price: '$1500', complex: 'Trout Residences' },
  { id: 3, name: 'Cityscape Suite', price: '$1800', complex: 'The Elite Complex' },
  { id: 4, name: 'Riverfront Retreat', price: '$2000', complex: 'Trout Estates' },
];

function HomePage() {
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
  const { id } = useParams();
  const apartment = apartments.find(ap => ap.id === Number(id));

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
