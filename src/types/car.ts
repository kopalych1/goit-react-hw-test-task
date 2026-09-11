export interface CarLocation {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: CarLocation;
  rentalConditions: string[];
  mileage: number;
}

export interface CarFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface FilterOptions {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export interface BookingRequest {
  name: string;
  email: string;
  comment: string;
}

export interface BookingResponse {
  message: string;
}
