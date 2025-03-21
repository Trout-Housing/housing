
interface Apartment {
  id: number;
  name: string;
  price: string;
  complex: string;
}

class DatabaseManager {
  private apartments: Apartment[];

  constructor() {
    // Mimicking a simple database with a hashmap or array
    this.apartments = [
      { id: 1, name: 'Sunset Loft', price: '$1200', complex: 'The Modern Nest' },
      { id: 2, name: 'Urban Oasis', price: '$1500', complex: 'Trout Residences' },
      { id: 3, name: 'Cityscape Suite', price: '$1800', complex: 'The Elite Complex' },
      { id: 4, name: 'Riverfront Retreat', price: '$2000', complex: 'Trout Estates' },
    ];
  }

  // Get apartments based on name or any other criteria
  getInfo(name: string): Apartment[] {
    return this.apartments.filter(apartment =>
      apartment.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Optionally, add more methods to handle other operations
  getApartmentById(id: number): Apartment | undefined {
    return this.apartments.find(apartment => apartment.id === id);
  }
}

// Export a single instance of the Database class
const db = new DatabaseManager();
export default db;
