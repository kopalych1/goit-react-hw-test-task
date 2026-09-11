import Link from 'next/link';
import css from './page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RentalCar — Home',
  description:
    'Find your perfect rental car. Reliable and budget-friendly rentals for any journey.',
};

export default function HomePage() {
  return (
    <main className={css.hero}>
      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.subtitle}>Reliable and budget-friendly rentals for any journey</p>
        <Link href="/catalog" className={css.button}>
          View Catalog
        </Link>
      </div>
    </main>
  );
}
