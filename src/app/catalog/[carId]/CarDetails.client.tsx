'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCarById } from '@/lib/api/cars';
import Image from 'next/image';
import css from './CarDetails.module.css';

import BookingForm from '@/components/BookingForm/BookingForm';

interface CarDetailsClientProps {
  carId: string;
}

export default function CarDetailsClient({ carId }: CarDetailsClientProps) {
  const { data: car, isLoading } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (!car) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.page}>
      <div className={css.left}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={480}
          className={css.image}
          priority
        />
        <BookingForm carId={car.id} />
      </div>

      <div className={css.right}>
        <div className={css.titleRow}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h1>
          <span className={css.article}>Article: {car.id.slice(0, 4)}</span>
        </div>
        <p className={css.location}>
          {car.location.city}, {car.location.country}
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>

        <h3 className={css.sectionTitle}>Rental Conditions:</h3>
        <ul className={css.list}>
          {car.rentalConditions.map(condition => (
            <li key={condition} className={css.listItem}>
              {condition}
            </li>
          ))}
        </ul>

        <h3 className={css.sectionTitle}>Car Specifications:</h3>
        <ul className={css.list}>
          <li className={css.listItem}>Year: {car.year}</li>
          <li className={css.listItem}>Type: {car.type}</li>
          <li className={css.listItem}>Fuel Consumption: {car.fuelConsumption}</li>
          <li className={css.listItem}>Engine: {car.engine}</li>
          <li className={css.listItem}>Mileage: {car.mileage.toLocaleString()} km</li>
        </ul>

        <h3 className={css.sectionTitle}>Features:</h3>
        <ul className={css.list}>
          {car.features.map(feature => (
            <li key={feature} className={css.listItem}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
