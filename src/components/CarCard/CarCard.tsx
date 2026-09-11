import { type Car } from '@/types/car';
import css from './CarCard.module.css';

import Image from 'next/image';

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  return (
    <li className={css.card}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={css.image}
        width={250}
        height={250}
        priority={priority}
      />

      <div className={css.header}>
        <h3 className={css.title}>
          {car.brand} <span className={css.model}>{car.model}</span>, {car.year}
        </h3>
        <span className={css.price}>${car.rentalPrice}</span>
      </div>

      <p className={css.meta}>
        {car.location.city} | {car.location.country} | {car.rentalCompany}
      </p>
      <p className={css.meta}>
        {car.type} | {car.mileage.toLocaleString()} km
      </p>

      <a
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={css.button}
      >
        Read more
      </a>
    </li>
  );
}
