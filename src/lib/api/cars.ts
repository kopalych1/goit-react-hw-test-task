import axios from 'axios';
import {
  type Car,
  type CarFilters,
  type FilterOptions,
  type BookingRequest,
  type BookingResponse,
} from '@/types/car';

const BASE_URL = 'https://car-rental-api.goit.study/cars';

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

interface FetchCarsParams extends CarFilters {
  page: number;
  perPage?: number;
}

export async function fetchCars({
  page,
  perPage = 12,
  brand,
  price,
  minMileage,
  maxMileage,
}: FetchCarsParams): Promise<FetchCarsResponse> {
  const response = await axios.get<FetchCarsResponse>(BASE_URL, {
    params: { page, perPage, brand, price, minMileage, maxMileage },
  });
  return response.data;
}

export async function fetchCarFilters(): Promise<FilterOptions> {
  const response = await axios.get<FilterOptions>(`${BASE_URL}/filters`);
  return response.data;
}

export async function fetchCarById(id: string): Promise<Car> {
  const response = await axios.get<Car>(`${BASE_URL}/${id}`);
  return response.data;
}

export async function createBookingRequest(
  carId: string,
  data: BookingRequest
): Promise<BookingResponse> {
  const response = await axios.post<BookingResponse>(`${BASE_URL}/${carId}/booking-requests`, data);
  return response.data;
}
