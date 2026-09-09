import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        Rental<span className={css.logoAccent}>Car</span>
      </Link>
      <nav>
        <ul className={css.nav}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
