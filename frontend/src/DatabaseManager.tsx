//Can only import from src dir unless extra configurations.
import apartmentsData from './apartmentsData.json';

interface Apartment {
  id: number;
  name: string;
  price: string;
  complex: string;
}

class DatabaseManager {
  private apartments: Apartment[];

  constructor() {
    // Use the imported JSON data
    this.apartments = apartmentsData.apartments;
  }

  getApartments(): Apartment[] {
    return this.apartments;
  }

  getInfo(name: string): Apartment[] {
    return this.apartments.filter(apartment =>
      apartment.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  getApartmentById(id: number): Apartment | undefined {
    return this.apartments.find(apartment => apartment.id === id);
  }
}

// Export a single instance of the Database class
const db = new DatabaseManager();
export default db;