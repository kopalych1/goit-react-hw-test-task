import { FiSearch } from 'react-icons/fi';
import css from './EmptyState.module.css';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={css.container}>
      <FiSearch className={css.icon} />
      <h3 className={css.title}>No cars found</h3>
      <p className={css.text}>
        We couldn&apos;t find any cars that match your current filters. Try changing your search
        criteria or reset the filters.
      </p>
      <button className={css.button} onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
