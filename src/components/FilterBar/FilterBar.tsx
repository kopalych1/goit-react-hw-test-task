'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCarFilters } from '@/lib/api/cars';
import { type CarFilters } from '@/types/car';
import css from './FilterBar.module.css';

interface FilterBarProps {
  draftFilters: CarFilters;
  setDraftFilters: (filters: CarFilters) => void;
  onSearch: () => void;
  onClear: () => void;
}

export default function FilterBar({
  draftFilters,
  setDraftFilters,
  onSearch,
  onClear,
}: FilterBarProps) {
  const { data: filterOptions } = useQuery({
    queryKey: ['carFilters'],
    queryFn: fetchCarFilters,
  });

  function handleBrandChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDraftFilters({ ...draftFilters, brand: e.target.value || undefined });
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setDraftFilters({ ...draftFilters, price: value ? Number(value) : undefined });
  }

  function handleMinMileageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDraftFilters({ ...draftFilters, minMileage: value ? Number(value) : undefined });
  }

  function handleMaxMileageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setDraftFilters({ ...draftFilters, maxMileage: value ? Number(value) : undefined });
  }

  return (
    <div className={css.bar}>
      <div className={css.field}>
        <label className={css.label}>Car brand</label>
        <select
          className={css.select}
          value={draftFilters.brand ?? ''}
          onChange={handleBrandChange}
        >
          <option value="">Choose a brand</option>
          {filterOptions?.brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={css.field}>
        <label className={css.label}>Price / 1 hour</label>
        <select
          className={css.select}
          value={draftFilters.price ?? ''}
          onChange={handlePriceChange}
        >
          <option value="">Choose a price</option>
          {filterOptions &&
            Array.from(
              { length: Math.floor((filterOptions.price.max - filterOptions.price.min) / 10) + 1 },
              (_, i) => filterOptions.price.min + i * 10
            ).map(price => (
              <option key={price} value={price}>
                To ${price}
              </option>
            ))}
        </select>
      </div>

      <div className={css.field}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageInputs}>
          <input
            type="number"
            placeholder="From"
            className={css.input}
            value={draftFilters.minMileage ?? ''}
            onChange={handleMinMileageChange}
          />
          <input
            type="number"
            placeholder="To"
            className={css.input}
            value={draftFilters.maxMileage ?? ''}
            onChange={handleMaxMileageChange}
          />
        </div>
      </div>

      <div className={css.searchGroup}>
        <button className={css.searchButton} onClick={onSearch}>
          Search
        </button>
        <button className={css.clearButton} onClick={onClear}>
          Clear filters
        </button>
      </div>
    </div>
  );
}
