import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.overlay}>
      <div className={css.card}>
        <div className={css.spinner} />
        <h3 className={css.title}>Loading cars...</h3>
        <p className={css.text}>Please wait while we fetch the best cars for you</p>
      </div>
    </div>
  );
}
